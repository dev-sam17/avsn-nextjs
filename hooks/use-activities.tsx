"use client";

import {
  createActivity,
  deleteActivity,
  getActivities,
} from "@/lib/actions/activities";
import * as React from "react";
import { Activity, ActivityForm } from "@/lib/types";
import { getImagesByFolderName, deleteImageFromCloudinary } from "@/lib/api";
import { Image } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type ActivitiesContextType = {
  activities: Activity[];
  addActivity: (newActivity: ActivityForm) => void;
  activeActivityId: string | null;
  setActiveActivityId: (id: string | null) => void;
  removeActivity: (id: string, sectionId: string) => void;
};

const ActivitiesContext = React.createContext<
  ActivitiesContextType | undefined
>(undefined);

export function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [activeActivityId, setActiveActivityId] = React.useState<string | null>(
    null
  );
  const { toast } = useToast();

  async function fetchActivities() {
    const activities = await getActivities();
    setActivities(activities);
  }

  React.useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = React.useCallback(async (newActivity: ActivityForm) => {
    const response = await createActivity(newActivity);
    setActivities((prev) => [...prev, response]);
    setActiveActivityId(response.id);
  }, []);

  const removeActivity = async (id: string, sectionId: string) => {
    toast({
      title: "Deleting notice...",
      description: (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ),
      className: "bg-emerald-50 border-emerald-200",
    });
    const { images } = await getImagesByFolderName(sectionId);
    if (images.length > 0) {
      await Promise.all(
        images.map((image: Image) => deleteImageFromCloudinary(image.public_id))
      );
      await deleteImageFromCloudinary(sectionId, "deleteFolder");
    }
    await deleteActivity(id);
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
    toast({
      title: "Success",
      description: "Activity deleted successfully",
      className: "bg-emerald-50 border-emerald-200",
    });
    setActiveActivityId(null);

    window.location.reload();
  };

  const value = React.useMemo(
    () => ({
      activities,
      addActivity,
      activeActivityId,
      setActiveActivityId,
      removeActivity,
    }),
    [
      activities,
      addActivity,
      activeActivityId,
      setActiveActivityId,
      removeActivity,
    ]
  );

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const context = React.useContext(ActivitiesContext);

  if (context === undefined) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }

  return context;
}
