import React, { useState } from 'react';

interface AddProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (path: string) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSave }) => {
	const [projectPath, setProjectPath] = useState('');

	if (!isOpen) return null;

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

	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-cyber-surface border border-cyber-accent/30 rounded-lg p-4 w-80">
				<h3 className="text-lg font-bold text-cyber-accent mb-3">Add Project</h3>
				<div className="space-y-3">
					<div>
						<label className="text-xs text-cyber-text/60 block mb-1">Project Path</label>
						<input
							type="text"
							value={projectPath}
							onChange={(e) => setProjectPath(e.target.value)}
							className="w-full bg-cyber-bg border border-cyber-accent/30 rounded px-2 py-1.5 text-sm text-cyber-text font-mono outline-none focus:border-cyber-accent"
							placeholder="/path/to/project"
							autoFocus
						/>
						<p className="text-xs text-cyber-text/40 mt-1">
							Folder name will be used as project name
						</p>
					</div>
					<div className="flex gap-2 mt-4">
						<button
							onClick={handleSave}
							className="flex-1 px-3 py-1.5 bg-cyber-accent/20 border border-cyber-accent rounded hover:bg-cyber-accent/30 text-cyber-accent text-sm font-semibold"
						>
							Save
						</button>
						<button
							onClick={handleCancel}
							className="flex-1 px-3 py-1.5 bg-cyber-surface border border-cyber-text/20 rounded hover:bg-cyber-text/10 text-cyber-text text-sm"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

