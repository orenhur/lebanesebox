# Official Hand to Hand artwork

Source: ../ChatGPT Image Nov 13, 2026, 11_07_13 PM.png, uploaded by the project owner through GitHub.

- hand-to-hand.png is a byte-for-byte copy of the uploaded PNG.
- hand-to-hand.webp is a lossless re-encoding. Its decoded RGBA pixels were compared with the PNG and are identical. No artwork, color, lettering or spacing was reconstructed.
- hand-to-hand-symbol.png and .webp contain the original heart/hands crop (596,108)-(1172,566), padded to a square without stretching. No part of the symbol is redrawn.
- favicon-128.png is a proportional favicon export of that symbol.

Source PNG SHA-256: a1f29295b998b82b4c8b63690ea7050542cbac81b1ff901abe867c9fcda20c18

The raster transition uses clipped/opacity stages of the same complete image and ends on its unclipped original composition. The hands are not reconstructed or morphed. Independent path animation would require the actual original vector layers.

Missing artwork bypasses the transition and leaves ordinary navigation working.

## Editorial display and transition derivatives

- `hand-to-hand-display-320.webp`, `-640.webp`, and `-960.webp` are proportional resized, lossless WebP exports of the existing master for smaller on-page uses. They preserve its composition and colors; the full-resolution PNG/WebP masters are unchanged.
- `transition-heart.webp`, `transition-upper-hand.webp`, and `transition-lower-hand.webp` isolate original symbol pixels onto transparent canvases for the reveal sequence. No vector paths, logo letterforms or replacement artwork were generated. The animation resolves to the original full-resolution WebP.
- The full-resolution transition artwork is warmed on collection-link hover/focus instead of blocking the initial page load.
