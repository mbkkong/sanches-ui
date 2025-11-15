import * as React from 'react';

import { cn } from '../../lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-11 w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-base text-slate-900 font-medium shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:border-blue-500 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 transition-all',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };

