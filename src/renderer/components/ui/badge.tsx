import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border-2 px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200',
				secondary: 'border-slate-300 bg-slate-200 text-slate-800 hover:bg-slate-300',
				destructive: 'border-red-200 bg-red-100 text-red-800 hover:bg-red-200',
				outline: 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

