"use client"

import { ChatContainer } from "@/components/chat/chat-container"

export default function Home() {
  return (
    <main className="h-dvh w-full max-w-lg mx-auto flex flex-col bg-background md:border-x md:border-border">
      <ChatContainer />
    </main>
  )
}
