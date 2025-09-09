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
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
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

const examplePrompts = [
    {
        icon: <Book className="h-4 w-4 mr-2" />,
        text: 'Explain React hooks'
    },
    {
        icon: <Code className="h-4 w-4 mr-2" />,
        text: 'How to write a Python function'
    },
    {
        icon: <BrainCircuit className="h-4 w-4 mr-2" />,
        text: 'Tips for a technical interview'
    }
]

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
    };
    setMessages((prev) => [...prev, userMessage]);
    if (input) setInput('');
    setIsLoading(true);

    try {
      const result = await answerStudentQuestions({ question: messageContent });
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
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col max-w-4xl mx-auto w-full">
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.length === 0 && !isLoading ? (
           <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Bot className="h-16 w-16 text-primary" />
             </div>
             <h2 className="mt-4 text-2xl font-semibold font-headline">How can I help you today?</h2>
             <p className="mt-2 text-muted-foreground max-w-md">
               Ask me anything about your courses, career, or any topic you're curious about!
             </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {examplePrompts.map(prompt => (
                    <button key={prompt.text} onClick={() => sendMessage(prompt.text)} className="p-4 border rounded-lg hover:bg-secondary transition-colors text-left flex items-center">
                        {prompt.icon}
                        <span className="text-sm font-medium">{prompt.text}</span>
                    </button>
                ))}
            </div>
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
                <Avatar className="h-9 w-9 border-2 border-primary/50">
                   <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xl rounded-lg p-4',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                 <Avatar className="h-9 w-9">
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
                 <Avatar className="h-9 w-9 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xl rounded-lg p-4 bg-card border flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        )}
      </div>

      <div className="p-4 bg-background sticky bottom-0">
        <form onSubmit={handleFormSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about anything from React hooks to career advice..."
            className="pr-20 pl-12 min-h-[56px] resize-none border-2 focus-visible:ring-primary/50"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleFormSubmit(e);
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center">
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" size="icon" variant="ghost" disabled={isLoading}>
                    <Sparkles className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enhance with AI</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center gap-2">
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
