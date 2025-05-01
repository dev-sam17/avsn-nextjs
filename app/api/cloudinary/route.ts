import { v2 as cloudinary } from 'cloudinary';
// import { Readable } from 'stream';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
};

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResource = {
    public_id: string;
    secure_url: string;
    format: string;
    width: number;
    height: number;
};

async function fetchImagesByFolder(folderName: string): Promise<CloudinaryResource[]> {
    const response = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderName,
        max_results: 100,
    });



    return response.resources.map((resource: CloudinaryResource) => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url,
        format: resource.format,
        width: resource.width,
        height: resource.height,
    }));
}

// async function uploadImageToCloudinary(fileBuffer: Buffer, folder: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//         Readable.from(fileBuffer).pipe(stream);
//     });
// }

async function deleteImageFromCloudinary(publicId: string): Promise<unknown> {
    return cloudinary.uploader.destroy(publicId);
}

async function deleteEmptyFolderFromCloudinary(folder: string) {
    return cloudinary.api.delete_folder(folder);
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder');
    if (!folder) {
        return NextResponse.json({ error: 'Missing folder parameter' }, { status: 400 });
    }
    try {
        const images = await fetchImagesByFolder(folder);
        return NextResponse.json({ images });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string;

        if (!file || !folder) {
            return NextResponse.json({ error: "Missing file or folder" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }).end(buffer);
        });

        return NextResponse.json({ result });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') ?? null;
    const body = await req.json();
    const { public_id } = body;

    if (action === "deleteFolder") {
        try {
            const result = await deleteEmptyFolderFromCloudinary(public_id);
            return NextResponse.json({ result });
        } catch (error) {
            return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
    }

    if (!public_id || typeof public_id !== 'string') {
        return NextResponse.json({ error: 'Missing or invalid public_id' }, { status: 400 });
    }

    try {
        const result = await deleteImageFromCloudinary(public_id);
        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
