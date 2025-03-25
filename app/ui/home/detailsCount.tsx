"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CountAnimation } from "@/components/ui/count-animation";

type TotalCountProps = {
  openedIn: number;
  students: number;
  faculty: number;
};

export const TotalCount = (props: TotalCountProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex py-10 justify-around items-center text-center">
        <div>
          <h3 className="mb-2 font-semibold text-2xl text-red-700">
            Opened In
          </h3>
          <CountAnimation
            number={props.openedIn}
            className="text-2xl lg:text-3xl font-medium "
          />
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-2xl text-lime-700">
            Students
          </h3>
          <CountAnimation
            number={props.students}
            className="text-2xl lg:text-3xl  font-medium "
          />
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-2xl text-emerald-700">
            Faculty
          </h3>
          <CountAnimation
            number={props.faculty}
            className="text-2xl lg:text-3xl font-medium "
          />
        </div>
      </div>
      <Button
        onClick={() => redirect("/about/our-story")}
        className="w-[150px] bg-cyan-600 hover:bg-cyan-800 font-medium text-lg mx-auto mb-10 px-10 py-5 rounded-none"
      >
        More
      </Button>
    </div>
  );
};
