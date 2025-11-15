#!/bin/bash

# Setup Python environment for Electron app packaging
# This script creates a clean Python virtual environment with all dependencies

set -e  # Exit on error

echo "🐍 Setting up Python environment for packaging..."

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CLI_DIR="$PROJECT_ROOT/cli"
VENV_DIR="$CLI_DIR/venv"

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is not installed"
    echo "Please install Python 3 to continue"
    exit 1
fi

PYTHON_VERSION=$(python3 --version)
echo "✓ Found $PYTHON_VERSION"

# Remove existing venv if it exists
if [ -d "$VENV_DIR" ]; then
    echo "🗑️  Removing existing virtual environment..."
    rm -rf "$VENV_DIR"
fi

# Create fresh virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv "$VENV_DIR"

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Upgrade pip to latest version
echo "⬆️  Upgrading pip..."
pip install --upgrade pip --quiet

# Install dependencies from requirements.txt
if [ -f "$CLI_DIR/requirements.txt" ]; then
    echo "📥 Installing dependencies from requirements.txt..."
    pip install -r "$CLI_DIR/requirements.txt" --quiet
    echo "✓ Dependencies installed successfully"
else
    echo "⚠️  Warning: requirements.txt not found at $CLI_DIR/requirements.txt"
fi

# List installed packages
echo ""
echo "📋 Installed packages:"
pip list

# Deactivate virtual environment
deactivate

echo ""
echo "✅ Python environment setup complete!"
echo "📂 Virtual environment location: $VENV_DIR"
echo ""

