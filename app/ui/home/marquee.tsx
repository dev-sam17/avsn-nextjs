import { MarqueeAnimation } from "@/components/ui/marquee-effect";

function MarqueeEffectDoubleExample() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <MarqueeAnimation
        direction="left"
        baseVelocity={-3}
        className="bg-violet-700 text-white font-light text-base md:text-lg py-2"
      >
        this is a marquee message for some important news or event
        &nbsp;&nbsp;&nbsp;&nbsp;
      </MarqueeAnimation>
    </div>
  );
}

export { MarqueeEffectDoubleExample };
