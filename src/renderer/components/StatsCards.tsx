import React from 'react';
import { AlertTriangle, AlertCircle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
		<div className="grid grid-cols-3 gap-4">
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium flex items-center gap-2">
						<AlertCircle className="w-4 h-4 text-destructive" />
						Critical
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-destructive">{criticalCount}</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium flex items-center gap-2">
						<AlertTriangle className="w-4 h-4 text-yellow-500" />
						Warnings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-yellow-500">{warningCount}</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium flex items-center gap-2">
						<Package className="w-4 h-4 text-blue-500" />
						Dependencies
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-blue-500">{depsCount}</div>
				</CardContent>
			</Card>
		</div>
	);
};
