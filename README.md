# Stemcraft

An AI bouquet planner that turns the flowers you have on hand into a considered arrangement, with a palette, proportions, and floral meaning.

Live app: [stemcraft-psi.vercel.app](https://stemcraft-psi.vercel.app/)

<img width="720" alt="Stemcraft bouquet planner" src="https://github.com/user-attachments/assets/1bcd8442-f2c5-4447-951e-fb8163de7040" />

Built with React, TypeScript, Tailwind CSS, Vite, Vercel Functions, and Groq.

## Run locally

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the app:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`. To run the Vercel API route locally too, use `vercel dev` with the same environment variable configured.

## Environment

Stemcraft uses one server-side environment variable:

```env
GROQ_API_KEY=
```

`GROQ_API_KEY` is used only by `/api/arrangement` to generate a bouquet recommendation. Do not expose it in a client-side `VITE_*` variable.

## Deployment

The app is deployed on Vercel. Import the repository as a Vercel project, add `GROQ_API_KEY` to the project's environment variables, and deploy. Vercel builds the Vite frontend and serves the arrangement endpoint from `api/arrangement.ts`.
