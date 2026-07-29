const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateHeartQR() {
  const url = 'https://happy-b-day-piaaaa.vercel.app/';

  // Get QR code matrix data
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const modules = qr.modules;
  const size = modules.size; // number of modules per side
  const data = modules.data; // flat Uint8ClampedArray: 1 = dark, 0 = light

  const moduleSize = 12; // px per module
  const totalSize = size * moduleSize;
  const padding = Math.round(totalSize * 0.08);
  const svgSize = totalSize + padding * 2;

  // ── Heart Shape Using Parametric Equations ──
  // x = 16 sin³(t), y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
  // Scaled to fit svgSize with some margin
  const heartScale = svgSize * 0.044;
  const heartCX = svgSize / 2;
  const heartCY = svgSize / 2 + svgSize * 0.04; // shift down slightly

  function heartX(t) {
    return heartCX + heartScale * 16 * Math.pow(Math.sin(t), 3);
  }
  function heartY(t) {
    return heartCY - heartScale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  }

  // Generate polygon points for heart path
  const steps = 300;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    points.push(`${heartX(t).toFixed(2)},${heartY(t).toFixed(2)}`);
  }
  const heartPathD = `M ${points.join(' L ')} Z`;

  // ── Check if a module center is inside the heart ──
  // Using ray-casting against the generated polygon
  function heartXAtT(t) { return heartCX + heartScale * 16 * Math.pow(Math.sin(t), 3); }
  function heartYAtT(t) { return heartCY - heartScale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); }

  const polyPoints = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    polyPoints.push([heartXAtT(t), heartYAtT(t)]);
  }

  function pointInPolygon(px, py, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      const intersect = ((yi > py) !== (yj > py)) &&
        (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // ── Build SVG Rects ──
  let rects = '';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const isDark = data[row * size + col] === 1;
      if (!isDark) continue;

      const x = padding + col * moduleSize;
      const y = padding + row * moduleSize;
      const cx = x + moduleSize / 2;
      const cy = y + moduleSize / 2;

      if (pointInPolygon(cx, cy, polyPoints)) {
        // Slightly rounded modules for premium feel
        rects += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${moduleSize - 1}" height="${moduleSize - 1}" rx="1.5" fill="url(#qrGrad)"/>`;
      }
    }
  }

  // ── Full SVG with gradient & glow ──
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     width="${svgSize}" height="${svgSize}" 
     viewBox="0 0 ${svgSize} ${svgSize}">
  <defs>
    <!-- Romantic rose-red to deep pink gradient -->
    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C41E3A"/>
      <stop offset="50%" stop-color="#E5004F"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </linearGradient>
    <!-- Heart background gradient (white to soft pink) -->
    <linearGradient id="heartBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FFF0F5"/>
    </linearGradient>
    <!-- Soft drop shadow filter -->
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#C41E3A" flood-opacity="0.25"/>
    </filter>
    <!-- Heart clip path -->
    <clipPath id="heartClip">
      <path d="${heartPathD}"/>
    </clipPath>
  </defs>

  <!-- Heart background fill (white) -->
  <path d="${heartPathD}" fill="url(#heartBg)" filter="url(#shadow)"/>

  <!-- QR modules clipped to heart shape -->
  <g clip-path="url(#heartClip)">
    ${rects}
  </g>

  <!-- Heart outline border for clean edge -->
  <path d="${heartPathD}" fill="none" stroke="#C41E3A" stroke-width="1.5" opacity="0.3"/>
</svg>`;

  const svgPath = path.join(__dirname, 'public', 'qr-heart.svg');
  fs.writeFileSync(svgPath, svg, 'utf8');
  console.log('SUCCESS - Heart QR saved to:', svgPath);
  console.log('Modules size:', size, '× QR module size:', moduleSize);
  console.log('SVG canvas size:', svgSize, 'px');
}

generateHeartQR().catch(console.error);
