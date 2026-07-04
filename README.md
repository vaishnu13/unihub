# UniHub

UniHub is your all-in-one platform for career success, offering personalized learning paths, internship recommendations, and AI-powered tutoring.

## Overview
This repository contains the purely static Next.js frontend UI for UniHub. The backend logic (including Firebase Auth and Firestore) has been stripped out, making this a lightweight, highly responsive frontend-only application ready to be deployed on any static web host, such as Vercel or GitHub Pages.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (Static Export)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

First, ensure you have the dependencies installed:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to view the application locally.

## Deployment

Since this project has been converted to a static UI, it can easily be deployed on **Vercel**:

1. Push your code to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and create a new Project.
3. Import this repository.
4. Vercel will automatically detect the Next.js setup. Click **Deploy**.

## License
MIT License
