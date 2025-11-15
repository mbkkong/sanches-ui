import React from 'react';
import { FolderOpen, Plus, Settings } from 'lucide-react';
import type { Project } from '../types';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
	// If no projects, show message directly instead of using Select
	if (projects.length === 0) {
		return (
			<div className="flex items-center gap-2">
				<FolderOpen className="w-4 h-4 text-muted-foreground" />
				<div className="flex-1 h-10 px-3 py-2 rounded-md border border-input bg-background text-sm text-muted-foreground flex items-center">
					No projects - Click + to add
				</div>
				<Button variant="outline" size="icon" onClick={onAddProject} title="Add project">
					<Plus className="w-4 h-4" />
				</Button>
				<Button variant="outline" size="icon" onClick={onManageProjects} title="Manage projects">
					<Settings className="w-4 h-4" />
				</Button>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<FolderOpen className="w-4 h-4 text-muted-foreground" />
			<Select value={activeProjectId || undefined} onValueChange={onSelectProject}>
				<SelectTrigger className="flex-1">
					<SelectValue placeholder="Select a project" />
				</SelectTrigger>
				<SelectContent>
					{projects.map((project) => (
						<SelectItem key={project.id} value={project.id}>
							{project.name} ({project.path})
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button variant="outline" size="icon" onClick={onAddProject} title="Add project">
				<Plus className="w-4 h-4" />
			</Button>
			<Button variant="outline" size="icon" onClick={onManageProjects} title="Manage projects">
				<Settings className="w-4 h-4" />
			</Button>
		</div>
	);
};
