"use client";

import { useRef, useEffect, useState } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";

const arr = new Array(10).fill(0).map((_, i) => i + 1);

export const NewsColumn = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) return;

    const scrollSpeed = 1; // Adjust for faster/slower scrolling
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          if (
            scrollDiv.scrollTop + scrollDiv.clientHeight >=
            scrollDiv.scrollHeight
          ) {
            scrollDiv.scrollTop = 0; // Reset to the top when reaching the bottom
          }
          scrollDiv.scrollTop += scrollSpeed;
        }
      }, 50);
    };

    startScrolling();

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, [isPaused]); // Depend on isPaused state
  return (
    <div
      className="container bg-white w-[90%] mx-auto md:mx-5 my-5 md:w-[50%]  h-[50vh] md:h-[30vh] xl:h-[50vh] p-4 pb-1 border  rounded shadow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h1 className="text-lg text-center font-semibold">News And Events</h1>
      <div className="container p-3 overflow-hidden">
        <p>Welcome to AV School of Nursing Website</p>
        <hr />
        <div ref={scrollRef} className="h-48 overflow-y-hidden">
          {arr.map((x) => (
            <p key={x} className="p-2 cursor-pointer text-blue-500">
              <DotFilledIcon className="inline" color="black" />
              &nbsp; News And Events {x}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
