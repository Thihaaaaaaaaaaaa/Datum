# One-click deploy: in Render, New + > Blueprint, point at this repo.
services:
  - type: web
    name: datum-studio
    runtime: node
    plan: free
    buildCommand: npm install
    startCommand: node server.js
    healthCheckPath: /healthz
    autoDeploy: true
    envVars:
      - key: NODE_VERSION
        value: "20"
