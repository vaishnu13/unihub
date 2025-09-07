'use client';

import { useState, useRef, useEffect } from 'react';
import { answerStudentQuestions } from '@/ai/flows/answer-student-questions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  FileUp,
  Send,
  User,
  Bot,
  Loader2,
  Book,
  Code,
  BrainCircuit,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await answerStudentQuestions({ question: input });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
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
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col">
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.length === 0 && !isLoading ? (
           <div className="flex flex-col items-center justify-center h-full text-center">
             <Bot className="h-16 w-16 text-muted-foreground" />
             <h2 className="mt-6 text-2xl font-semibold font-headline">AI Tutor</h2>
             <p className="mt-2 text-muted-foreground">
               Ask me anything about your courses, career, or any topic you're curious about!
             </p>
           </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
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
                  'max-w-xl rounded-lg p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border'
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
          ))
        )}
        {isLoading && (
            <div className="flex items-start gap-4 justify-start">
                 <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xl rounded-lg p-3 text-sm bg-card border flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        )}
      </div>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about anything from React hooks to career advice..."
            className="pr-24 min-h-[52px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSendMessage(e);
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" size="icon" variant="ghost" disabled={isLoading}>
                    <FileUp className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload Document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
         <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">Press Shift+Enter for a new line.</p>
            <div className="flex items-center gap-2">
                <p className="text-xs font-medium">Learning Mode:</p>
                <Select defaultValue="general">
                    <SelectTrigger className="h-7 w-[120px] text-xs">
                        <SelectValue placeholder="Learning Mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="general"><div className="flex items-center gap-2"><BrainCircuit size={14}/> General</div></SelectItem>
                        <SelectItem value="academic"><div className="flex items-center gap-2"><Book size={14}/> Academic</div></SelectItem>
                        <SelectItem value="code"><div className="flex items-center gap-2"><Code size={14}/> Code Helper</div></SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </div>
    </div>
  );
}
