import React from 'react';
import { Trash2, FolderOpen } from 'lucide-react';
import type { Project } from '../types';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

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
	const handleDelete = (projectId: string, projectName: string) => {
		if (confirm(`Are you sure you want to delete ${projectName}?`)) {
			onDelete(projectId);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Manage Projects</DialogTitle>
					<DialogDescription>
						Configure your projects, enable/disable watching, and remove projects you no longer need.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-3 max-h-96 overflow-y-auto py-4">
					{projects.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							<FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
							<p>No projects yet</p>
						</div>
					) : (
						projects.map((project) => (
							<Card
								key={project.id}
								className={project.id === activeProjectId ? 'border-primary' : ''}
							>
								<CardContent className="p-4">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<h3 className="font-semibold">{project.name}</h3>
												{project.id === activeProjectId && (
													<Badge variant="default" className="text-xs">
														Active
													</Badge>
												)}
											</div>
											<p className="text-sm text-muted-foreground font-mono truncate">
												{project.path}
											</p>
											<div className="flex items-center gap-2 mt-3">
												<Switch
													id={`watch-${project.id}`}
													checked={project.watchEnabled}
													onCheckedChange={(checked) => onToggleWatch(project.id, checked)}
												/>
												<label
													htmlFor={`watch-${project.id}`}
													className="text-sm font-medium cursor-pointer"
												>
													Watch Enabled
												</label>
											</div>
										</div>
										<Button
											variant="destructive"
											size="icon"
											onClick={() => handleDelete(project.id, project.name)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
