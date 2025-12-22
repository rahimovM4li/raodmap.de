import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  isActive?: boolean;
  isLast?: boolean;
}

export function StepCard({
  number,
  title,
  description,
  isCompleted = false,
  isActive = false,
  isLast = false,
}: StepCardProps) {
  return (
    <div className="flex gap-4">
      {/* Step indicator and line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all',
            isCompleted
              ? 'bg-success text-success-foreground'
              : isActive
              ? 'step-indicator'
              : 'bg-secondary text-muted-foreground'
          )}
        >
          {isCompleted ? <Check className="w-5 h-5" /> : number}
        </div>
        {!isLast && (
          <div
            className={cn(
              'step-line flex-grow my-2',
              isCompleted && 'step-line-active'
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn('pb-8', isLast && 'pb-0')}>
        <h4
          className={cn(
            'font-semibold text-lg mb-1',
            isActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
