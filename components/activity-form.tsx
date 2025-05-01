"use client";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useActivities } from "@/hooks/use-activities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Activity name must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  description: z.string().optional(),
});

export function ActivityForm() {
  const { toast } = useToast();
  const { addActivity } = useActivities();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    addActivity({
      title: values.name,
      description: values.description ?? null,
      date: values.date,
      sectionId: `activity-${values.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${format(values.date, "yyyy-MM-dd")}`,
    });

    toast({
      title: "Activity added",
      description: `${values.name} has been added successfully.`,
      className: "bg-emerald-50 border-emerald-200",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-emerald-700">Activity Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter activity name"
                  {...field}
                  className="bg-white border-emerald-200 focus-visible:ring-emerald-500"
                />
              </FormControl>
              <FormDescription>Activity Or Event Name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-emerald-700">Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Description"
                  {...field}
                  className="bg-white border-emerald-200 focus-visible:ring-emerald-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-emerald-700">Activity Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal border-emerald-200 focus-visible:ring-emerald-500",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Activity Date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </form>
    </Form>
  );
}
