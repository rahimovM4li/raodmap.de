import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Briefcase, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PathCardProps {
  type: 'study' | 'work' | 'ausbildung';
  title: string;
  description: string;
  duration: string;
  href: string;
}

const iconMap = {
  study: GraduationCap,
  work: Briefcase,
  ausbildung: Wrench,
};

const colorMap = {
  study: {
    bg: 'bg-study-light',
    border: 'border-study/30 hover:border-study',
    icon: 'bg-study text-study-foreground',
    iconBg: 'bg-study',
  },
  work: {
    bg: 'bg-work-light',
    border: 'border-work/30 hover:border-work',
    icon: 'bg-work text-work-foreground',
    iconBg: 'bg-work',
  },
  ausbildung: {
    bg: 'bg-ausbildung-light',
    border: 'border-ausbildung/30 hover:border-ausbildung',
    icon: 'bg-ausbildung text-ausbildung-foreground',
    iconBg: 'bg-ausbildung',
  },
};

export function PathCard({ type, title, description, duration, href }: PathCardProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <Link
      to={href}
      className={cn(
        'card-path group p-6 md:p-8 flex flex-col',
        colors.bg,
        colors.border
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mb-6',
          colors.iconBg
        )}
      >
        <Icon className="w-7 h-7 text-card" />
      </div>

      {/* Content */}
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 flex-grow">
        {description}
      </p>

      {/* Duration Badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full">
          {duration}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
