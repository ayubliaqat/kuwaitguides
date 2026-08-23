import { getMessages } from "./actions";
import MessagesList from "./MessagesList";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="text-xl font-semibold text-text">Messages</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <MessagesList messages={messages} />
      </div>
    </div>
  );
}