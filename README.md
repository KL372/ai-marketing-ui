# AI Marketing UI (Node/Express + EJS)

A simple UI for generating channel-specific marketing copy. It renders an EJS form and posts user inputs to the Flask backend's /generate endpoint, then displays the returned options (hook, body_text, call_to_action).

## Prerequisites
- Node.js 18+ (LTS recommended)
- Internet access (for npm and the backend API)

## Quick Start
```bash
# from ai-marketing-ui/
npm ci
cp .env.example .env        # edit BACKEND_URL if your API runs elsewhere
npm start                   # UI at http://localhost:3000
```
Open http://localhost:3000/channel and submit the form.

## Configuration (.env)
```ini
# UI reads these via `import 'dotenv/config'` in app.js
BACKEND_URL=http://localhost:5001   # where the Flask API is running
PORT=3000                           # optional; defaults to 3000
```

## How it works
- app.js
  - Loads env: `import 'dotenv/config'`
  - Sets `app.locals.backendUrl = process.env.BACKEND_URL || 'http://localhost:5001'`
  - Boots Express + EJS (with express-ejs-layouts)
- routes/channelRoute.js
  - Routes GET and POST /channel to a single controller (getChannel)
- controllers/channelController.js
  - GET -> renders an empty form
  - POST -> forwards form fields to `${backendUrl}/generate` using axios; renders results or error
- views/channel.ejs
  - The form and results UI
- public/js/channelControl.js
  - Wrapped in an IIFE to avoid global name clashes (prevents "already declared" errors)
  - Updates placeholders by channel; disables button & shows spinner on submit; smooth-scrolls to results

## Project Structure
```
ai-marketing-ui/
  app.js
  controllers/
    channelController.js
  routes/
    channelRoute.js
  views/
    channel.ejs
    layout.ejs
  public/
    js/channelControl.js
    css/...
  package.json
  package-lock.json
  .env.example
  .gitignore
```

## Troubleshooting
- UI can't reach API / ECONNREFUSED -> start the backend, and ensure BACKEND_URL points to it (default http://localhost:5001).
- CORS error in browser -> backend must enable CORS (see API README).
- 401 invalid_api_key (bubbles up from backend) -> add a valid key to the backend .env and restart it.
- Console error "Identifier … already declared" -> ensure channelControl.js is the only script declaring those variables, or keep it wrapped in an IIFE (as provided).

## Notes
- Do not commit .env or node_modules/; both are ignored via .gitignore.
- This UI is environment-driven: no hard-coded backend URLs in controllers.


