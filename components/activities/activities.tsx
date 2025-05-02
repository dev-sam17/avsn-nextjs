"use client";

import { motion } from "framer-motion";
import { ActivityCard } from "@/components/activities/activitiy-card";
import { ActivityGallery } from "@/components/activities/activity-gallery";
import { Activity } from "@/lib/types";

export default function Activities({ activities }: { activities: Activity[] }) {
  return (
    <div className="space-y-16">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className="relative"
        >
          {index < activities.length - 1 && (
            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-transparent h-full z-10" />
          )}

          <div className="relative z-10">
            <ActivityCard activity={activity} />

            <div className="mt-6 ml-14">
              <ActivityGallery sectionId={activity.sectionId} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
