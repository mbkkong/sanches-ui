import React from 'react';
import type { Project } from '../types';

interface ProjectSelectorProps {
	projects: Project[];
	activeProjectId?: string;
	onSelectProject: (projectId: string) => void;
	onAddProject: () => void;
	onManageProjects: () => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
	projects,
	activeProjectId,
	onSelectProject,
	onAddProject,
	onManageProjects,
}) => {
	return (
		<div className="bg-cyber-surface/50 backdrop-blur-sm border border-cyber-accent/20 rounded-lg p-2">
			<div className="flex items-center gap-2">
				<span className="text-cyber-accent/60 text-xs">📂</span>
				<select
					value={activeProjectId || ''}
					onChange={(e) => onSelectProject(e.target.value)}
					className="flex-1 bg-transparent text-cyber-accent text-xs font-mono border-none outline-none cursor-pointer"
				>
					{projects.length === 0 ? (
						<option value="">No projects - Click + to add</option>
					) : (
						projects.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name} ({project.path})
							</option>
						))
					)}
				</select>
				<button
					onClick={onAddProject}
					className="px-2 py-0.5 bg-cyber-accent/10 hover:bg-cyber-accent/20 border border-cyber-accent/30 rounded text-cyber-accent text-xs"
					title="Add project"
				>
					+
				</button>
				<button
					onClick={onManageProjects}
					className="px-2 py-0.5 bg-cyber-accent/10 hover:bg-cyber-accent/20 border border-cyber-accent/30 rounded text-cyber-accent text-xs"
					title="Manage projects"
				>
					⚙️
				</button>
			</div>
		</div>
	);
};

