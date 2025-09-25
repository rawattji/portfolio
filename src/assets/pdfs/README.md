# Resume PDF

Place your `resume.pdf` file in this directory to display it in the Resume section of your portfolio.

## File Requirements:
- File name: `resume.pdf`
- Recommended size: < 2MB
- Format: PDF

## To Enable PDF Display:
1. Add your resume.pdf to this folder
2. Update the public folder configuration in next.config.ts to serve static assets
3. Uncomment the iframe sections in ResumeSection.tsx

## Example Next.js Config:
```typescript
// next.config.ts
const nextConfig = {
  // ... other config
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/assets/:path*',
      },
    ];
  },
};
```