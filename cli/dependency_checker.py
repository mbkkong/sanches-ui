import json
import subprocess
from typing import List, Dict, Any
from pathlib import Path


class DependencyChecker:
    def __init__(self):
        pass

    def scan_directory(self, directory: str) -> List[Dict[str, Any]]:
        """
        Scan a directory for dependency vulnerabilities
        Returns a list of vulnerable dependencies with their descriptions
        """
        directory_path = Path(directory)
        vulnerabilities = []

        # Check for npm vulnerabilities
        if (directory_path / "package.json").exists():
            npm_vulns = self._check_npm_vulnerabilities(directory_path)
            vulnerabilities.extend(npm_vulns)

        # Check for Python vulnerabilities
        if (directory_path / "requirements.txt").exists():
            python_vulns = self._check_python_vulnerabilities(directory_path)
            vulnerabilities.extend(python_vulns)

        return vulnerabilities

    def _check_npm_vulnerabilities(self, directory: Path) -> List[Dict[str, Any]]:
        """Check npm packages for vulnerabilities using npm audit"""
        try:
            result = subprocess.run(
                ['npm', 'audit', '--json'],
                cwd=str(directory),
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.stdout:
                data = json.loads(result.stdout)
                vulnerabilities = []
                
                # Handle both npm v6 and v7+ formats
                if 'vulnerabilities' in data:
                    # npm v7+ format
                    for pkg_name, vuln_data in data['vulnerabilities'].items():
                        if isinstance(vuln_data, dict):
                            severity = vuln_data.get('severity', 'unknown')
                            via = vuln_data.get('via', [])
                            
                            # Extract vulnerability details
                            description_parts = []
                            for v in via:
                                if isinstance(v, dict):
                                    title = v.get('title', '')
                                    cve = v.get('cve', '')
                                    url = v.get('url', '')
                                    
                                    desc = title
                                    if cve:
                                        desc = f"{cve}: {desc}"
                                    if url:
                                        desc += f" - {url}"
                                    
                                    description_parts.append(desc)
                            
                            if description_parts:
                                vulnerabilities.append({
                                    'package_type': 'npm',
                                    'package': pkg_name,
                                    'description': ' | '.join(description_parts)
                                })
                
                elif 'advisories' in data:
                    # npm v6 format
                    for advisory_id, advisory in data['advisories'].items():
                        vulnerabilities.append({
                            'package_type': 'npm',
                            'package': advisory.get('module_name', 'unknown'),
                            'description': f"{advisory.get('title', 'No title')} - Severity: {advisory.get('severity', 'unknown')}"
                        })
                
                return vulnerabilities
        except (subprocess.TimeoutExpired, subprocess.CalledProcessError, json.JSONDecodeError, FileNotFoundError):
            pass
        
        return []

    def _check_python_vulnerabilities(self, directory: Path) -> List[Dict[str, Any]]:
        """Check Python packages for vulnerabilities using pip-audit or safety"""
        vulnerabilities = []
        
        # Try pip-audit first (more modern and accurate)
        try:
            result = subprocess.run(
                ['pip-audit', '--format', 'json', '-r', str(directory / 'requirements.txt')],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.stdout:
                data = json.loads(result.stdout)
                
                if 'dependencies' in data:
                    for dep in data['dependencies']:
                        pkg_name = dep.get('name', 'unknown')
                        vulns = dep.get('vulns', [])
                        
                        for vuln in vulns:
                            cve_id = vuln.get('id', 'Unknown CVE')
                            description = vuln.get('description', 'No description available')
                            
                            vulnerabilities.append({
                                'package_type': 'pip',
                                'package': pkg_name,
                                'description': f"{cve_id}: {description}"
                            })
                
                return vulnerabilities
        except (subprocess.TimeoutExpired, subprocess.CalledProcessError, json.JSONDecodeError, FileNotFoundError):
            pass
        
        # Fallback to safety check
        try:
            result = subprocess.run(
                ['safety', 'check', '--json', '-r', str(directory / 'requirements.txt')],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.stdout:
                data = json.loads(result.stdout)
                
                for vuln in data:
                    if isinstance(vuln, list) and len(vuln) >= 4:
                        pkg_name = vuln[0]
                        description = vuln[3]
                        
                        vulnerabilities.append({
                            'package_type': 'pip',
                            'package': pkg_name,
                            'description': description
                        })
                
                return vulnerabilities
        except (subprocess.TimeoutExpired, subprocess.CalledProcessError, json.JSONDecodeError, FileNotFoundError):
            pass
        
        return []


def check_dependencies(directory: str) -> List[Dict[str, Any]]:
    """
    Main function to check dependencies for vulnerabilities

    Args:
        directory: Directory path to scan

    Returns:
        List of vulnerable dependencies with their descriptions
        Format: [{'package_type': 'npm', 'package': 'lodash', 'description': 'CVE-XXX: ...'}]
    """
    checker = DependencyChecker()
    return checker.scan_directory(directory)


