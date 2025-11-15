import React from 'react';
import { Shield, PlayCircle, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

interface HeaderProps {
	globalWatchEnabled: boolean;
	onToggleWatch: () => void;
	onRunScan: () => void;
	lastScanTime: string;
}

export const Header: React.FC<HeaderProps> = ({
	globalWatchEnabled,
	onToggleWatch,
	onRunScan,
	lastScanTime,
}) => {
	return (
		<header className="border-b bg-card">
			<div className="px-6 py-4">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
							<Shield className="w-6 h-6 text-primary-foreground" />
						</div>
						<div>
							<h1 className="text-xl font-bold">Sanches</h1>
							<p className="text-sm text-muted-foreground">Security Monitor</p>
						</div>
					</div>

					<Button onClick={onRunScan} size="default">
						<PlayCircle className="w-4 h-4" />
						Run Scan
					</Button>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Activity className={`w-4 h-4 ${globalWatchEnabled ? 'text-green-500' : 'text-destructive'}`} />
						<Badge variant={globalWatchEnabled ? 'default' : 'secondary'}>
							{globalWatchEnabled ? 'Active' : 'Stopped'}
						</Badge>
					</div>
					<span className="text-muted-foreground">•</span>
					<span className="text-sm text-muted-foreground">Last scan: {lastScanTime}</span>
					<span className="text-muted-foreground">•</span>
					<div className="flex items-center gap-2">
						<Switch
							checked={globalWatchEnabled}
							onCheckedChange={onToggleWatch}
							id="global-watch"
						/>
						<label htmlFor="global-watch" className="text-sm font-medium">
							Watch Mode
						</label>
					</div>
				</div>
			</div>
		</header>
	);
};
