import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { Notice } from "@/lib/types";
import Link from "next/link";

function MarqueeEffectDoubleExample({ content }: { content: Notice }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Link
        href={content.fileUrl ? content.fileUrl : "javascript:void(0)"}
        target="_blank"
      >
        <MarqueeAnimation
          direction="left"
          baseVelocity={-3}
          className="bg-emerald-600 text-white font-light text-base md:text-lg py-2"
        >
          {content.content + "\u00A0\u00A0\u00A0\u00A0"}
        </MarqueeAnimation>
      </Link>
    </div>
  );
}

export { MarqueeEffectDoubleExample };
