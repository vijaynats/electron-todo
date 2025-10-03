import { defineConfig } from 'vite';

export default async () => {
  const react = (await import('@vitejs/plugin-react')).default;

  return defineConfig({
    plugins: [react()],
    // other config...
  });
};