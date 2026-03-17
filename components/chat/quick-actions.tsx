"use client"

import { Button } from "@/components/ui/button"
import { Calendar, HelpCircle, MapPin, Utensils } from "lucide-react"

interface QuickActionsProps {
  onSelect: (action: string) => void
}

const actions = [
  { icon: Calendar, label: "Book a service", prompt: "I'd like to book a service" },
  { icon: Utensils, label: "Restaurant tips", prompt: "Can you recommend some restaurants nearby?" },
  { icon: MapPin, label: "Local guides", prompt: "What are the best local attractions to visit?" },
  { icon: HelpCircle, label: "Get help", prompt: "I need help with something" },
]

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          size="sm"
          className="rounded-full text-xs gap-1.5 h-8"
          onClick={() => onSelect(action.prompt)}
        >
          <action.icon className="h-3.5 w-3.5" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
