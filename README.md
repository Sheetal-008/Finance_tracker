# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/caf3f0c4-ca8f-4d8d-98fb-cf8616bd67fe

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/caf3f0c4-ca8f-4d8d-98fb-cf8616bd67fe) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/caf3f0c4-ca8f-4d8d-98fb-cf8616bd67fe) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Backend (Finos Server)

Location: `server/`

- Stack: Node.js, Express.js, MongoDB (Mongoose), JWT, OpenAI
- Endpoints (all under `/api`):
  - `POST /api/auth/register` – Register user → `{ token, user }`
  - `POST /api/auth/login` – Login → `{ token, user }`
  - `GET /api/transactions` – List transactions (JWT)
  - `POST /api/transactions` – Create transaction (JWT)
  - `DELETE /api/transactions/:id` – Delete transaction (JWT)
  - `GET /api/summary?format=csv` – Summary and optional CSV export (JWT)
  - `POST /api/ask` – Ask AI with access to user’s transactions (JWT)

### Configure

Create `server/.env` based on `server/.env.example` and set:

- `MONGODB_URI` – MongoDB Atlas connection string
- `JWT_SECRET` – any strong random string
- `CORS_ORIGIN` – frontend origin (e.g., http://localhost:8080)
- `OPENAI_API_KEY` – OpenAI API key (optional; without it, AI still returns fallback computed answers)

### Run locally

```bash
cd server
npm install
npm run dev
```

The server runs on port 5000. The frontend Vite dev server proxies `/api` to the backend.

### Deploy

- Preferred: Render/Railway. Set environment variables as above.
- Expose port 5000 and set start command `npm start`.
