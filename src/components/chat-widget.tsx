'use client';

import { Bot, Send, X, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState, useRef, useEffect } from 'react';
import { answerStudentQuestions } from '@/ai/flows/answer-student-questions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

type ChatWidgetProps = {
  onClose: () => void;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm the UniHub assistant. How can I help you today? You can ask me about our features, or any login/signup issues.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await answerStudentQuestions({ question: input });
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-32 right-10 z-50 w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-xl flex flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold font-headline">UniHub Help</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </header>
      <div
        ref={scrollAreaRef}
        className="p-4 h-80 overflow-y-auto space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={20} />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'max-w-xs rounded-lg p-3 text-sm',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary'
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
             {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                 <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm bg-secondary flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        )}
      </div>
      <footer className="border-t p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            placeholder="Ask a question..."
            className="pr-12"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
