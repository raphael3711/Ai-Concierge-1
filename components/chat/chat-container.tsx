"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatHeader } from "./chat-header"
import { ChatInput } from "./chat-input"
import { MessageBubble, type Message } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { QuickActions } from "./quick-actions"
import { Sparkles } from "lucide-react"

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI Concierge. How can I assist you today? I can help you with bookings, recommendations, local information, and much more.",
    role: "assistant",
    timestamp: new Date(),
  },
]

const MOCK_RESPONSES = [
  "I'd be happy to help you with that! Let me look into the best options for you.",
  "Great question! Based on your preferences, I have some excellent recommendations.",
  "I understand. Let me check the availability and get back to you with the details.",
  "Absolutely! I can arrange that for you. Would you like me to proceed with the booking?",
  "That's a wonderful choice! Here are some additional tips to make the most of your experience.",
]

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const hasConversation = messages.length > 1

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader />
      
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="flex flex-col gap-4 py-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        
        {!hasConversation && (
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Quick Actions</span>
            </div>
            <QuickActions onSelect={handleSend} />
          </div>
        )}
      </ScrollArea>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}
