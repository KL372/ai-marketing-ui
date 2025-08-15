/**
 * app.js (UI server)
 * Purpose: Bootstraps the Express + EJS web UI.
 * - Sets up the view engine + layout system
 * - Serves static assets
 * - Parses form/JSON bodies
 * - Mounts feature routes
 */
import 'dotenv/config'; 
import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts'; // ✅ import it
// Feature routes (each route file renders an EJS view)
import channelRoute from './routes/channelRoute.js';
import ideasRoute   from './routes/ideasRoute.js';
import enhanceRoute from './routes/enhanceRoute.js';
import observeRoute from './routes/observeRoute.js';
import indexRoute from './routes/indexRoute.js';

const app = express();

// read env + set fallbacks
const PORT = process.env.PORT || 3000;
app.locals.backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';

/* ------------------------- View engine configuration ------------------------ */
app.set('view engine', 'ejs');  // use .ejs files in /views
app.set('views', path.join('.', 'views')); // resolve views directory
app.set('layout', 'layout'); // default layout: views/layout.ejs
app.use(expressLayouts);  // enable express-ejs-layouts

/* ----------------------------- Core middleware ------------------------------ */
app.use(express.static('public')); // serve /public (css/js/images)
app.use(express.urlencoded({ extended: true })); // parse HTML form bodies
app.use(express.json());// parse JSON bodies (POST/PUT)

/* ---------------------------------- Routes --------------------------------- */
// Each router handles GET (render page) and POST (form actions) for its path.
app.use('/channel', channelRoute);
app.use('/ideas',   ideasRoute);
app.use('/enhance', enhanceRoute);
app.use('/observe', observeRoute);
app.use('/', indexRoute);// home page

/* --------------------------------- Server ---------------------------------- */
app.listen(PORT, () => {
  console.log(`UI at http://localhost:${PORT}`);
  console.log(`Backend URL = ${app.locals.backendUrl}`); //  easy to verify
});

