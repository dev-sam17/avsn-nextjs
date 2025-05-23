

export async function getImagesByFolderName(folder: string) {
  try {
    // const baseUrl =
    //   typeof window === "undefined"
    //     ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
    //     : "";

    const response = await fetch(`/api/cloudinary?folder=${folder}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
}


export async function uploadImageToCloudinary(file: File, folder: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  try {
    const response = await fetch('/api/cloudinary', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImageFromCloudinary(public_id: string, action: string | null = null) {
  try {
    const response = await fetch(`/api/cloudinary?action=${action}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
}

