import React from 'react';

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
		<header className="relative border-b border-cyber-accent/30 bg-cyber-surface/50 backdrop-blur-sm">
			<div className="scan-line" />
			<div className="px-4 py-3">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-cyber-accent/10 rounded-lg flex items-center justify-center border border-cyber-accent/30">
							<span className="text-lg glow-text">🛡️</span>
						</div>
						<div>
							<h1 className="text-lg font-bold glow-text text-cyber-accent">SANCHES</h1>
							<p className="text-xs text-cyber-text/60">Security Monitor</p>
						</div>
					</div>

					<button
						onClick={onRunScan}
						className="px-3 py-1.5 bg-cyber-accent/20 border border-cyber-accent/50 rounded-lg hover:bg-cyber-accent/30 transition-all text-cyber-accent text-xs font-semibold"
					>
						⚡ Scan
					</button>
				</div>

				<div className="flex items-center gap-2 text-xs">
					<div className="flex items-center gap-1">
						<div
							className={`w-1.5 h-1.5 rounded-full ${
								globalWatchEnabled ? 'bg-cyber-accent card-glow' : 'bg-cyber-danger'
							}`}
						/>
						<span className="text-cyber-text/80">
							{globalWatchEnabled ? 'Active' : 'Stopped'}
						</span>
					</div>
					<span className="text-cyber-text/40">•</span>
					<span className="text-cyber-text/60">{lastScanTime}</span>
					<span className="text-cyber-text/40">•</span>
					<button
						onClick={onToggleWatch}
						className={`px-2 py-0.5 border rounded hover:bg-opacity-30 transition-all font-semibold ${
							globalWatchEnabled
								? 'bg-cyber-accent/20 border-cyber-accent/50 text-cyber-accent'
								: 'bg-cyber-danger/20 border-cyber-danger/50 text-cyber-danger'
						}`}
					>
						Watch: {globalWatchEnabled ? 'ON' : 'OFF'}
					</button>
				</div>
			</div>
		</header>
	);
};

