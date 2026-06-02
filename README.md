# DATUM — floorplan → form

A browser-based studio that turns a **2D floorplan into a 3D building model in real time**.
Draw walls on a snapping grid, cut in doors and windows, and export clean **GLB / OBJ**
that drops straight into Blender, Assimp, or any BIM pipeline.

Everything runs **client-side** — the server only serves static files, so it deploys
anywhere in seconds.

```
┌────────────────────────────┐        ┌────────────────────────────┐
│  01 · PLAN (2D)            │        │  02 · FORM (3D, real time) │
│  draw walls, doors,        │ ────▶  │  extruded walls, floor      │
│  windows on a grid         │        │  slabs, roofs, orbit view   │
└────────────────────────────┘        └────────────────────────────┘
                       │
                       ▼  export
            GLB / OBJ  ·  JSON plan
```

## Features

- **Plan ↔ form, live.** The 2D drawing and the 3D model are the same building; edit one, the other updates.
- **Drawing tools.** Wall (snapping + vertex-snap), Door (full-height opening + swing arc), Window (real sill/head), Erase, Pan/zoom.
- **Geometry controls.** Wall height & thickness, floor slabs, flat roofs, grid spacing, door/window widths.
- **Live readouts.** Cursor coordinates, segment lengths while drawing, per-room areas, total floor area.
- **Persistence.** Auto-saves to your browser; **Save / Open** plans as portable `.json`.
- **Clean export.** `GLB` (binary) or `OBJ`, with an optional **Strip metadata** toggle that removes the generator string / comments so the file is pure geometry — your design, no watermark.

## Run locally

Requires Node 18+.

```bash
npm install
npm start
# open http://localhost:3000
```

The landing page is at `/`, the editor at `/app`.

## Deploy to Render

**Option A — Blueprint (one click).**
1. Push this folder to a GitHub repo.
2. In Render: **New +  →  Blueprint**, select the repo. `render.yaml` is detected automatically.
3. Click **Apply**. Render runs `npm install` then `node server.js` and gives you a public URL.

**Option B — Manual web service.**
1. Render: **New +  →  Web Service**, connect the repo.
2. Settings — Runtime: **Node**, Build: `npm install`, Start: `node server.js`, Health check: `/healthz`.
3. Create. Done.

**Option C — Static site (always-on free, no server).**
Since the app is fully client-side you can skip Node entirely:
**New +  →  Static Site**, Build command: *(empty)*, Publish directory: `public`.
(Link to `/app.html` directly in this mode.)

> The free Node web service sleeps after inactivity and cold-starts (~30 s) on the next hit. For a graded link that must load instantly, Option C is the safest.

## Project structure

```
datum/
├── server.js          # tiny Express static server + /healthz
├── package.json
├── render.yaml        # Render blueprint
├── .gitignore
└── public/
    ├── index.html     # landing page
    ├── app.html       # the editor (Three.js, client-side)
    └── favicon.svg
```

## Tech & licensing

- **Three.js** (3D rendering + GLTF/OBJ exporters) — MIT licensed, free for commercial use.
- **Google Fonts** Bricolage Grotesque + JetBrains Mono — open licensed.
- **Express** — MIT.

The geometry you export is generated entirely from your own drawing input — no third-party
models are bundled and no AI watermark is written. Exported buildings are your work and
your copyright. (Note: tracing someone else's copyrighted floorplan carries that design's
copyright, independent of this tool.)

## Notes / roadmap

- Closed wall loops become rooms (floor slabs + optional roofs); open runs are interior partitions.
- A natural next layer is a small Python service running OpenCV / Segment Anything to convert an
  **uploaded blueprint image** into the same wall-chain data the editor uses — that step needs a
  GPU/server rather than the browser, so it lives outside this deploy.

MIT License.
