import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { ProjectSelector } from './components/ProjectSelector';
import { IssuesList } from './components/IssuesList';
import { AddProjectModal } from './components/AddProjectModal';
import { ManageProjectsModal } from './components/ManageProjectsModal';
import { useElectron } from './hooks/useElectron';
import type { IssueWithType } from './types';
import './styles.css';

export const App: React.FC = () => {
	const {
		projects,
		activeProjectId,
		globalWatchEnabled,
		scanResult,
		addProject,
		deleteProject,
		setActiveProject,
		toggleGlobalWatch,
		toggleProjectWatch,
		runScan,
		loadProjects,
	} = useElectron();

	const [lastScanTime, setLastScanTime] = useState('--:--:--');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isManageModalOpen, setIsManageModalOpen] = useState(false);

	// Update last scan time when scan result changes
	useEffect(() => {
		if (scanResult) {
			const now = new Date();
			setLastScanTime(now.toLocaleTimeString());
		}
	}, [scanResult]);

	// Prepare issues with type
	const issuesWithType: IssueWithType[] = [
		...(scanResult?.critical.map((issue) => ({ ...issue, type: 'critical' as const })) || []),
		...(scanResult?.warning.map((issue) => ({ ...issue, type: 'warning' as const })) || []),
	];

	const handleAddProject = async (path: string) => {
		await addProject(path);
	};

	const handleDeleteProject = async (projectId: string) => {
		await deleteProject(projectId);
		await loadProjects();
	};

	const handleToggleWatch = async () => {
		await toggleGlobalWatch(!globalWatchEnabled);
	};

	return (
		<div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100/50 text-foreground">
			<Header
				globalWatchEnabled={globalWatchEnabled}
				onToggleWatch={handleToggleWatch}
				onRunScan={runScan}
				lastScanTime={lastScanTime}
			/>

			<main className="flex-1 overflow-hidden">
				<div className="px-6 py-6 h-full flex flex-col gap-6">
					<StatsCards
						criticalCount={scanResult?.critical.length || 0}
						warningCount={scanResult?.warning.length || 0}
						depsCount={scanResult?.dependencies.length || 0}
					/>

					<ProjectSelector
						projects={projects}
						activeProjectId={activeProjectId}
						onSelectProject={setActiveProject}
						onAddProject={() => setIsAddModalOpen(true)}
						onManageProjects={() => setIsManageModalOpen(true)}
					/>

					<IssuesList issues={issuesWithType} dependencies={scanResult?.dependencies || []} />
				</div>
			</main>

			<AddProjectModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSave={handleAddProject}
			/>

			<ManageProjectsModal
				isOpen={isManageModalOpen}
				projects={projects}
				activeProjectId={activeProjectId}
				onClose={() => setIsManageModalOpen(false)}
				onDelete={handleDeleteProject}
				onToggleWatch={toggleProjectWatch}
			/>
		</div>
	);
};
