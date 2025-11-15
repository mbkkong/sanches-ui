import React from 'react';
import type { Project } from '../types';

interface ManageProjectsModalProps {
	isOpen: boolean;
	projects: Project[];
	activeProjectId?: string;
	onClose: () => void;
	onDelete: (projectId: string) => void;
	onToggleWatch: (projectId: string, enabled: boolean) => void;
}

export const ManageProjectsModal: React.FC<ManageProjectsModalProps> = ({
	isOpen,
	projects,
	activeProjectId,
	onClose,
	onDelete,
	onToggleWatch,
}) => {
	if (!isOpen) return null;

	const handleDelete = (projectId: string, projectName: string) => {
		if (confirm(`Are you sure you want to delete ${projectName}?`)) {
			onDelete(projectId);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-cyber-surface border border-cyber-accent/30 rounded-lg p-4 w-96">
				<h3 className="text-lg font-bold text-cyber-accent mb-3">Manage Projects</h3>
				<div className="space-y-2 max-h-64 overflow-y-auto mb-4">
					{projects.length === 0 ? (
						<p className="text-cyber-text/60 text-sm text-center py-4">No projects yet</p>
					) : (
						projects.map((project) => (
							<div
								key={project.id}
								className={`bg-cyber-bg border ${
									project.id === activeProjectId
										? 'border-cyber-accent'
										: 'border-cyber-text/20'
								} rounded p-2`}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="flex-1 min-w-0">
										<p
											className={`text-sm font-semibold ${
												project.id === activeProjectId
													? 'text-cyber-accent'
													: 'text-cyber-text'
											}`}
										>
											{project.name}
										</p>
										<p className="text-xs text-cyber-text/60 font-mono truncate">
											{project.path}
										</p>
									</div>
									<button
										onClick={() => handleDelete(project.id, project.name)}
										className="ml-2 px-2 py-1 bg-cyber-danger/20 border border-cyber-danger/30 rounded text-cyber-danger text-xs hover:bg-cyber-danger/30"
									>
										Delete
									</button>
								</div>
								<div className="flex items-center gap-2">
									<label className="flex items-center gap-2 cursor-pointer flex-1">
										<input
											type="checkbox"
											checked={project.watchEnabled}
											onChange={(e) => onToggleWatch(project.id, e.target.checked)}
											className="w-4 h-4 bg-cyber-bg border border-cyber-accent/30 rounded checked:bg-cyber-accent cursor-pointer"
										/>
										<span
											className={`text-xs ${
												project.watchEnabled ? 'text-cyber-accent' : 'text-cyber-text/60'
											}`}
										>
											Watch Enabled
										</span>
									</label>
								</div>
							</div>
						))
					)}
				</div>
				<button
					onClick={onClose}
					className="w-full px-3 py-1.5 bg-cyber-surface border border-cyber-text/20 rounded hover:bg-cyber-text/10 text-cyber-text text-sm"
				>
					Close
				</button>
			</div>
		</div>
	);
};

