"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { Activity } from "@/lib/types";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <motion.div
      className="flex items-start gap-4"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center"
        whileHover={{ backgroundColor: "#0D9488", color: "white" }}
        transition={{ duration: 0.3 }}
      >
        <Calendar className="h-6 w-6 text-teal-600" />
      </motion.div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">{activity.title}</h3>
          {activity.url && activity.url !== "#" && (
            <a
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-600 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Visit {activity.title}</span>
            </a>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {format(new Date(activity.date), "MMMM d, yyyy")}
        </p>

        {activity.description && (
          <p className="text-muted-foreground mt-1">{activity.description}</p>
        )}
      </div>
    </motion.div>
  );
}
