import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
	plugins: [react()],
	root: path.join(__dirname, 'src/renderer'),
	base: './',
	build: {
		outDir: path.join(__dirname, 'dist-react'),
		emptyOutDir: true,
	},
	server: {
		port: 3000,
	},
});

