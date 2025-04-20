"use client";

import { useRef, useEffect, useState } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Notices } from "@/prisma/generated/client";

export const NewsColumn = ({ notices }: { notices: Notices[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollDiv = scrollRef.current;
    if (!scrollDiv) return;

    const scrollSpeed = 1;
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
          if (scrollTop + clientHeight >= scrollHeight) {
            scrollDiv.scrollTop = 0;
          }
          scrollDiv.scrollTop += scrollSpeed;
        }
      }, 50);
    };

    startScrolling();
    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <div
      className="container bg-white w-[90%] md:w-[50%] h-[40vh] md:h-[35vh] lg:h-[35vh] xl:h-[50vh] mx-auto md:mx-5 my-5 p-4 pb-1 border rounded-lg shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h1 className="text-lg font-semibold text-center mb-3">
        News And Events
      </h1>

      <div className="container p-3 overflow-hidden">
        <p className="mb-2 text-gray-700">
          Welcome to AV School of Nursing Website
        </p>
        <hr className="mb-2" />

        <div
          ref={scrollRef}
          className="h-48 md:h-[13.5rem] lg:h-[20rem] xl:h-[13rem] overflow-y-hidden space-y-1"
        >
          {notices.map((notice) => (
            <p
              key={notice.id}
              className="p-1 text-teal-800 hover:text-teal-600  transition cursor-pointer"
            >
              <DotFilledIcon className="inline mr-1" color="black" />
              {notice.notice}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
