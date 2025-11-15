import React, { useState } from 'react';
import type { IssueType, IssueWithType, DependencyIssue } from '../types';

interface IssuesListProps {
	issues: IssueWithType[];
	dependencies: DependencyIssue[];
}

export const IssuesList: React.FC<IssuesListProps> = ({ issues, dependencies }) => {
	const [filter, setFilter] = useState<'all' | IssueType>('all');

	const filteredIssues = issues.filter((issue) => filter === 'all' || issue.type === filter);
	const filteredDeps = filter === 'all' || filter === 'dependencies' ? dependencies : [];

	const copyToClipboard = (text: string, button: HTMLButtonElement) => {
		navigator.clipboard.writeText(text).then(() => {
			const original = button.innerHTML;
			button.innerHTML = '✓';
			button.classList.add('bg-cyber-accent/30');

			setTimeout(() => {
				button.innerHTML = original;
				button.classList.remove('bg-cyber-accent/30');
			}, 1500);
		});
	};

	const formatFilePath = (filepath: string) => {
		const parts = filepath.split('/');
		if (parts.length > 4) {
			return '.../' + parts.slice(-3).join('/');
		}
		return filepath;
	};

	const getIssueColors = (type: IssueType) => {
		const colors = {
			critical: {
				bg: 'bg-cyber-danger/5',
				border: 'border-cyber-danger/30',
				text: 'text-cyber-danger',
				badge: 'bg-cyber-danger/20',
			},
			warning: {
				bg: 'bg-cyber-warning/5',
				border: 'border-cyber-warning/30',
				text: 'text-cyber-warning',
				badge: 'bg-cyber-warning/20',
			},
			dependencies: {
				bg: 'bg-blue-400/5',
				border: 'border-blue-400/30',
				text: 'text-blue-400',
				badge: 'bg-blue-400/20',
			},
		};
		return colors[type];
	};

	const getIcon = (type: IssueType) => {
		const icons = {
			critical: '🚨',
			warning: '⚠️',
			dependencies: '📦',
		};
		return icons[type];
	};

	return (
		<div className="flex-1 overflow-hidden flex flex-col min-h-0">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-sm font-bold text-cyber-accent glow-text">Issues</h2>
				<div className="flex gap-1 text-xs">
					<button
						onClick={() => setFilter('all')}
						className={`px-2 py-0.5 rounded-full border text-xs ${
							filter === 'all'
								? 'bg-cyber-accent/20 border-cyber-accent text-cyber-accent'
								: 'border-cyber-text/30 text-cyber-text/60'
						}`}
					>
						All
					</button>
					<button
						onClick={() => setFilter('critical')}
						className={`px-2 py-0.5 rounded-full border border-cyber-danger/30 text-cyber-danger text-xs ${
							filter === 'critical' ? 'bg-cyber-danger/20' : ''
						}`}
					>
						Critical
					</button>
					<button
						onClick={() => setFilter('warning')}
						className={`px-2 py-0.5 rounded-full border border-cyber-warning/30 text-cyber-warning text-xs ${
							filter === 'warning' ? 'bg-cyber-warning/20' : ''
						}`}
					>
						Warn
					</button>
					<button
						onClick={() => setFilter('dependencies')}
						className={`px-2 py-0.5 rounded-full border border-blue-400/30 text-blue-400 text-xs ${
							filter === 'dependencies' ? 'bg-blue-400/20' : ''
						}`}
					>
						Deps
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto space-y-2 pr-1">
				{filteredIssues.length === 0 && filteredDeps.length === 0 ? (
					<div className="text-center py-20 text-cyber-accent">
						<div className="text-6xl mb-4">✅</div>
						<p className="text-xl font-bold glow-text">All Clear!</p>
						<p className="text-sm mt-2 text-cyber-text/60">
							No {filter === 'all' ? '' : filter} issues detected
						</p>
					</div>
				) : (
					<>
						{filteredIssues.map((issue, idx) => {
							const colors = getIssueColors(issue.type);
							return (
								<div
									key={idx}
									className={`relative ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg p-3 hover:${colors.border.replace('/30', '/50')} transition-all`}
								>
									<div className="flex items-start gap-2">
										<div className="text-xl">{getIcon(issue.type)}</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-2 group">
												<span
													className={`px-2 py-0.5 ${colors.badge} ${colors.text} text-xs font-bold uppercase rounded shrink-0`}
												>
													{issue.type}
												</span>
												<p
													className="text-xs text-cyber-text/60 font-mono truncate flex-1"
													title={issue.file}
												>
													📄 {formatFilePath(issue.file || 'Unknown file')}
												</p>
												<button
													onClick={(e) =>
														copyToClipboard(issue.file || '', e.currentTarget)
													}
													className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 bg-cyber-accent/10 hover:bg-cyber-accent/20 border border-cyber-accent/30 rounded text-cyber-accent text-xs shrink-0"
													title="Copy file path"
												>
													📋
												</button>
											</div>
											<p className="text-xs text-cyber-text/80 break-words">
												{issue.description || 'No description'}
											</p>
										</div>
									</div>
								</div>
							);
						})}
						{filteredDeps.map((dep, idx) => {
							const colors = getIssueColors('dependencies');
							return (
								<div
									key={`dep-${idx}`}
									className={`relative ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg p-3 hover:${colors.border.replace('/30', '/50')} transition-all`}
								>
									<div className="flex items-start gap-2">
										<div className="text-xl">{getIcon('dependencies')}</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<span
													className={`px-2 py-0.5 ${colors.badge} ${colors.text} text-xs font-bold uppercase rounded`}
												>
													dependencies
												</span>
												<span className="text-xs text-blue-400 opacity-60">
													{dep.package_type || 'N/A'}
												</span>
											</div>
											<p className="font-bold text-blue-400 text-sm mb-1">
												{dep.package || 'Unknown Package'}
											</p>
											<p className="text-xs text-cyber-text/80 break-words">
												{dep.description || 'No description'}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

