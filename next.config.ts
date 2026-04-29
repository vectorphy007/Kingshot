import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enable Static Export
  output: 'export',
  
  // 2. Set the base path (the name of your GitHub repository)
  // Example: if your repo is github.com/vectorphy007/kingshot-terminal
  // Use: '/kingshot-terminal'
  basePath: '/<your-repo-name>', 
  
  // 3. GitHub Pages doesn't support the Next.js Image Optimization API
  images: {
    unoptimized: true,
  },
};

export default nextConfig;