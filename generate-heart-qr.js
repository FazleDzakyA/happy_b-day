const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateHeartQR() {
  const url = 'https://happy-b-day-piaaaa.vercel.app/';

  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const modules = qr.modules;
  const size = modules.size; // 37
  const data = modules.data;

  // ── Canvas ──
  const svgSize = 700;
  const halfSize = svgSize / 2;

  // ── Heart Parametric ──
  // x(t) = 16 * sin³(t)
  // y(t) = -(13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))
  //
  // Normalized bounds:
  //   x: [-16, 16]  → width = 32
  //   y: top bumps at y_norm = -6, bottom tip at y_norm = +17
  //   total height_norm = 23

  // Scale so the FULL heart (both x and y) fits inside canvas with margin
  const margin = 20;
  const available = svgSize - 2 * margin;

  // Scale by the tighter dimension
  const scaleByWidth  = available / 32;  // = (700-40)/32 = 20.625
  const scaleByHeight = available / 23;  // = (700-40)/23 = 28.70
  const heartScale = Math.min(scaleByWidth, scaleByHeight); // 20.625

  // Center x
  const heartCX = halfSize;
  // Center y: top bump at -6*scale, bottom tip at +17*scale
  // We want top at margin → heartCY - 6*scale = margin
  const heartCY = margin + 6 * heartScale; // = 20 + 6*20.625 = 143.75

  console.log(`heartScale=${heartScale.toFixed(2)}, heartCX=${heartCX}, heartCY=${heartCY.toFixed(2)}`);
  console.log(`Heart x range: [${(heartCX - 16*heartScale).toFixed(0)}, ${(heartCX + 16*heartScale).toFixed(0)}]`);
  console.log(`Heart y range: [${(heartCY - 6*heartScale).toFixed(0)}, ${(heartCY + 17*heartScale).toFixed(0)}]`);

  // ── QR module size & offset ──
  // Fit the QR grid inside the heart's inner rectangle
  // Heart's inner usable width ≈ 80% of total (heart curves inward at corners)
  // We'll let the heart clip handle the shape — just center the QR
  const qrAreaW = 16 * heartScale * 2 * 0.92; // ~608 but heart narrows; use 92%
  const moduleSize = qrAreaW / size; // px per module
  const qrOffsetX = heartCX - (size / 2) * moduleSize;
  const qrOffsetY = heartCY - 5 * heartScale - 0.5 * moduleSize; // align top of QR to top of heart dip

  console.log(`moduleSize=${moduleSize.toFixed(2)}, qrOffsetX=${qrOffsetX.toFixed(1)}, qrOffsetY=${qrOffsetY.toFixed(1)}`);

  // ── Build heart polygon for point-in-heart test ──
  const STEPS = 600;
  function heartPt(t) {
    return {
      x: heartCX + heartScale * 16 * Math.pow(Math.sin(t), 3),
      y: heartCY - heartScale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
  }

  const poly = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2;
    const p = heartPt(t);
    poly.push([p.x, p.y]);
  }

  function inHeart(px, py) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      if (((yi > py) !== (yj > py)) &&
          (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  // ── Heart SVG path string ──
  const pts = [];
  for (let i = 0; i <= 400; i++) {
    const t = (i / 400) * Math.PI * 2;
    const p = heartPt(t);
    pts.push(`${p.x.toFixed(2)},${p.y.toFixed(2)}`);
  }
  const heartD = `M ${pts.join(' L ')} Z`;

  // ── Build QR rects ──
  let rects = '';
  let modulesInside = 0;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (data[row * size + col] !== 1) continue;

      const x = qrOffsetX + col * moduleSize;
      const y = qrOffsetY + row * moduleSize;
      const cx = x + moduleSize / 2;
      const cy = y + moduleSize / 2;

      if (inHeart(cx, cy)) {
        modulesInside++;
        rects += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" rx="1.2" fill="url(#g)"/>`;
      }
    }
  }
  console.log(`Modules inside heart: ${modulesInside}`);

  // ── SVG ──
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#CC0033"/>
      <stop offset="50%"  stop-color="#E5004F"/>
      <stop offset="100%" stop-color="#880022"/>
    </linearGradient>
    <filter id="sh" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#CC0033" flood-opacity="0.3"/>
    </filter>
    <clipPath id="hc">
      <path d="${heartD}"/>
    </clipPath>
  </defs>

  <!-- White background -->
  <rect width="${svgSize}" height="${svgSize}" fill="white"/>

  <!-- Heart fill -->
  <path d="${heartD}" fill="white" filter="url(#sh)" stroke="#E5004F" stroke-width="1.5" stroke-opacity="0.15"/>

  <!-- QR modules clipped to heart -->
  <g clip-path="url(#hc)">
    ${rects}
  </g>

  <!-- Heart outline border -->
  <path d="${heartD}" fill="none" stroke="#CC0033" stroke-width="2.5" stroke-opacity="0.25"/>
</svg>`;

  const out = path.join(__dirname, 'public', 'qr-heart.svg');
  fs.writeFileSync(out, svg, 'utf8');
  console.log('SUCCESS → saved to', out);
}

generateHeartQR().catch(console.error);
