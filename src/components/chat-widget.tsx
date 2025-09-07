import { Bot, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type ChatWidgetProps = {
  onClose: () => void;
};

export function ChatWidget({ onClose }: ChatWidgetProps) {
  return (
    <div className="fixed bottom-32 right-10 z-50 w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-xl">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold font-headline">UniHub Help</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </header>
      <div className="p-4 h-80 overflow-y-auto space-y-4">
         <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
            </div>
            <div className="rounded-lg bg-secondary p-3 text-sm">
                <p>Hello! I'm the UniHub assistant. How can I help you today? You can ask me about our features or any login/signup issues.</p>
            </div>
        </div>
      </div>
      <footer className="border-t p-4">
        <div className="relative">
          <Input placeholder="Ask a question..." className="pr-12" />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
