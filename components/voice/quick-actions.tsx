'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  description?: string;
  onSelect: () => void;
}

const defaultActions: QuickAction[] = [
  {
    label: 'What goes with this?',
    icon: '🍷',
    description: 'Get pairing suggestions',
    onSelect: () => {
      console.log('[v0] User selected pairing suggestion');
    },
  },
  {
    label: 'Cheaper option?',
    icon: '💰',
    description: 'Find budget alternatives',
    onSelect: () => {
      console.log('[v0] User selected cheaper option');
    },
  },
  {
    label: 'Non-alcoholic?',
    icon: '🥤',
    description: 'Show alternatives without alcohol',
    onSelect: () => {
      console.log('[v0] User selected non-alcoholic');
    },
  },
];

interface QuickActionsProps {
  actions?: QuickAction[];
  isEnabled?: boolean;
}

export function QuickActions({
  actions = defaultActions,
  isEnabled = true,
}: QuickActionsProps) {
  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-1 gap-3">
      {actions.map((action, idx) => (
        <Button
          key={idx}
          onClick={action.onSelect}
          disabled={!isEnabled}
          variant="outline"
          className="justify-start h-auto py-3 px-4 text-left"
        >
          <span className="text-xl mr-3">{action.icon}</span>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{action.label}</span>
            {action.description && (
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
}
