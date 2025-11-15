import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Package, Copy, CheckCircle2, FileText } from 'lucide-react';
import type { IssueType, IssueWithType, DependencyIssue } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface IssuesListProps {
	issues: IssueWithType[];
	dependencies: DependencyIssue[];
}

export const IssuesList: React.FC<IssuesListProps> = ({ issues, dependencies }) => {
	const [filter, setFilter] = useState<'all' | IssueType>('all');
	const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

	const filteredIssues = issues.filter((issue) => filter === 'all' || issue.type === filter);
	const filteredDeps = filter === 'all' || filter === 'dependencies' ? dependencies : [];

	const copyToClipboard = (text: string, index: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 1500);
		});
	};

	const formatFilePath = (filepath: string) => {
		const parts = filepath.split('/');
		if (parts.length > 4) {
			return '.../' + parts.slice(-3).join('/');
		}
		return filepath;
	};

	const getIssueIcon = (type: IssueType) => {
		switch (type) {
			case 'critical':
				return <AlertCircle className="w-5 h-5 text-destructive" />;
			case 'warning':
				return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
			case 'dependencies':
				return <Package className="w-5 h-5 text-blue-500" />;
		}
	};

	const getIssueBadgeVariant = (type: IssueType) => {
		switch (type) {
			case 'critical':
				return 'destructive';
			case 'warning':
				return 'secondary';
			case 'dependencies':
				return 'default';
		}
	};

	const criticalCount = issues.filter((i) => i.type === 'critical').length;
	const warningCount = issues.filter((i) => i.type === 'warning').length;
	const depsCount = dependencies.length;

	return (
		<div className="flex-1 overflow-hidden flex flex-col">
			<Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="flex-1 flex flex-col">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">Issues</h2>
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="critical">
							Critical {criticalCount > 0 && `(${criticalCount})`}
						</TabsTrigger>
						<TabsTrigger value="warning">
							Warnings {warningCount > 0 && `(${warningCount})`}
						</TabsTrigger>
						<TabsTrigger value="dependencies">
							Deps {depsCount > 0 && `(${depsCount})`}
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value={filter} className="flex-1 overflow-y-auto space-y-3 mt-0">
					{filteredIssues.length === 0 && filteredDeps.length === 0 ? (
						<Card className="border-dashed">
							<CardContent className="flex flex-col items-center justify-center py-16">
								<CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
								<h3 className="text-xl font-bold mb-2">All Clear!</h3>
								<p className="text-muted-foreground">
									No {filter === 'all' ? '' : filter} issues detected
								</p>
							</CardContent>
						</Card>
					) : (
						<>
							{filteredIssues.map((issue, idx) => (
								<Card key={idx} className="hover:shadow-md transition-shadow">
									<CardHeader className="pb-3">
										<div className="flex items-start gap-3">
											{getIssueIcon(issue.type)}
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<Badge variant={getIssueBadgeVariant(issue.type)}>
														{issue.type.toUpperCase()}
													</Badge>
												</div>
												<CardTitle className="text-sm font-medium break-words">
													{issue.description || 'No description'}
												</CardTitle>
											</div>
										</div>
									</CardHeader>
									<CardContent className="pt-0">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<FileText className="w-4 h-4 shrink-0" />
											<span className="truncate flex-1" title={issue.file}>
												{formatFilePath(issue.file || 'Unknown file')}
											</span>
											<Button
												variant="ghost"
												size="icon"
												className="h-7 w-7"
												onClick={() => copyToClipboard(issue.file || '', `issue-${idx}`)}
											>
												{copiedIndex === `issue-${idx}` ? (
													<CheckCircle2 className="w-4 h-4" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
							{filteredDeps.map((dep, idx) => (
								<Card key={`dep-${idx}`} className="hover:shadow-md transition-shadow">
									<CardHeader className="pb-3">
										<div className="flex items-start gap-3">
											{getIssueIcon('dependencies')}
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<Badge variant="default">DEPENDENCY</Badge>
													<Badge variant="outline" className="text-xs">
														{dep.package_type || 'N/A'}
													</Badge>
												</div>
												<CardTitle className="text-base font-semibold text-blue-500">
													{dep.package || 'Unknown Package'}
												</CardTitle>
											</div>
										</div>
									</CardHeader>
									<CardContent className="pt-0">
										<CardDescription className="break-words">
											{dep.description || 'No description'}
										</CardDescription>
									</CardContent>
								</Card>
							))}
						</>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};
