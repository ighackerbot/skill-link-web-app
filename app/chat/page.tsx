import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  )
}
