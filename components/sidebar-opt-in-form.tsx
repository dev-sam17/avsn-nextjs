import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SidebarOptInForm() {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-sm font-semibold leading-none tracking-tight">Stay Updated</h3>
        <p className="text-xs text-muted-foreground">Get notified about new features</p>
      </div>
      <div className="mt-3 grid gap-2">
        <Input type="email" placeholder="Email" className="h-8 text-xs" />
        <Button size="sm" className="h-8 text-xs">
          <Bell className="mr-2 size-3" />
          Subscribe
        </Button>
      </div>
    </div>
  )
}

