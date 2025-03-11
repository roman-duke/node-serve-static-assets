# Exploring the fundamentals
This is a quick exploration in node.js that serves static assets via http.

## Goals
- The aim of this exploration is to get started with streaming, while also refreshing my memory on running a node.js server that serves
static sites without using Express.

### Streaming Solution
The video asset to be streamed is a video of about 1.9GB in size. Obviously loading everything up into memory before serving it is extremely inefficient. This is where streaming comes into play; we load just chunks into memory and serve that via streams. The 206 Partial content header is used to tell the browser that what we have served is just a portion as indicated in the range field in the request header; the browser keeps coming back for more chunks after this.
