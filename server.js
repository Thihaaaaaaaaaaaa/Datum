// DATUM — minimal static web service (Render-ready)
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

// serve /app -> public/app.html, etc. (extensionless URLs)
app.use(express.static(PUBLIC, { extensions: ['html'], maxAge: '1h' }));

// health check for Render
app.get('/healthz', (_req, res) => res.json({ ok: true, app: 'datum' }));

// fall back to the landing page for unknown routes
app.get('*', (_req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));

app.listen(PORT, () => console.log(`DATUM running on :${PORT}`));
