import React from 'react';

interface StatsCardsProps {
	criticalCount: number;
	warningCount: number;
	depsCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
	criticalCount,
	warningCount,
	depsCount,
}) => {
	return (
		<div className="grid grid-cols-3 gap-2">
			<div className="bg-cyber-surface/50 backdrop-blur-sm border border-cyber-danger/30 rounded-lg p-2 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-12 h-12 bg-cyber-danger/5 rounded-full blur-xl" />
				<div className="relative">
					<p className="text-cyber-danger/60 text-xs uppercase tracking-wider">Critical</p>
					<p className="text-2xl font-bold text-cyber-danger">{criticalCount}</p>
				</div>
			</div>

			<div className="bg-cyber-surface/50 backdrop-blur-sm border border-cyber-warning/30 rounded-lg p-2 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-12 h-12 bg-cyber-warning/5 rounded-full blur-xl" />
				<div className="relative">
					<p className="text-cyber-warning/60 text-xs uppercase tracking-wider">Warnings</p>
					<p className="text-2xl font-bold text-cyber-warning">{warningCount}</p>
				</div>
			</div>

			<div className="bg-cyber-surface/50 backdrop-blur-sm border border-blue-400/30 rounded-lg p-2 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-12 h-12 bg-blue-400/5 rounded-full blur-xl" />
				<div className="relative">
					<p className="text-blue-400/60 text-xs uppercase tracking-wider">Dependencies</p>
					<p className="text-2xl font-bold text-blue-400">{depsCount}</p>
				</div>
			</div>
		</div>
	);
};

