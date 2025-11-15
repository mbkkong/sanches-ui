import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AddProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (path: string) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSave }) => {
	const [projectPath, setProjectPath] = useState('');

	const handleSave = () => {
		if (!projectPath.trim()) {
			alert('Please enter a project path');
			return;
		}
		onSave(projectPath.trim());
		setProjectPath('');
		onClose();
	};

	const handleCancel = () => {
		setProjectPath('');
		onClose();
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			handleCancel();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Project</DialogTitle>
					<DialogDescription>
						Enter the path to your project directory. The folder name will be used as the project name.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<label htmlFor="project-path" className="text-sm font-medium">
							Project Path
						</label>
						<Input
							id="project-path"
							value={projectPath}
							onChange={(e) => setProjectPath(e.target.value)}
							placeholder="/path/to/project"
							autoFocus
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleCancel}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
