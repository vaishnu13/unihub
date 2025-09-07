import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, iconClassName }: { className?: string, iconClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <GraduationCap className={cn("h-6 w-6 text-primary", iconClassName)} />
      <span className="text-xl font-bold text-foreground font-headline">
        UniHub
      </span>
    </div>
  );
}
