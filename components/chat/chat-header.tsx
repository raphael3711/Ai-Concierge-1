"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, MoreVertical, Sparkles } from "lucide-react"

interface ChatHeaderProps {
  onMenuClick?: () => void
}

export function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Avatar className="h-10 w-10 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-base font-semibold text-foreground">AI Concierge</h1>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-5 w-5" />
        <span className="sr-only">More options</span>
      </Button>
    </header>
  )
}
