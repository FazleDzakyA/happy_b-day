const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateRomanticQR() {
  const url = 'https://happy-b-day-piaaaa.vercel.app/';

  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const { data, size } = qr.modules;

  const mod = 12;           // px per module
  const qrPx = size * mod;  // total QR area
  const pad = 28;           // padding inside white QR card
  const cardW = qrPx + pad * 2;
  const cardH = qrPx + pad * 2;

  // Extra canvas for decorations
  const W = cardW + 120;
  const H = cardH + 200;
  const cx = W / 2;

  // ── Build QR module rects ──
  // Finder patterns: top-left (0,0)-(6,6), top-right (0,N-7)-(6,N-1), bottom-left (N-7,0)-(N-1,6)
  function isFinder(r, c) {
    const n = size;
    return (r < 7 && c < 7) ||           // top-left
           (r < 7 && c >= n - 7) ||       // top-right
           (r >= n - 7 && c < 7);          // bottom-left
  }

  const offX = (W - qrPx) / 2;
  const offY = 90 + pad;  // card top at y=90, then inner padding

  let modules = '';
  let finderRects = '';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!data[r * size + c]) continue;
      const x = offX + c * mod;
      const y = offY + r * mod;

      if (isFinder(r, c)) {
        // Finder blocks: filled by finderRects separately (drawn as whole blocks)
        continue;
      }
      modules += `<rect x="${x + 0.8}" y="${y + 0.8}" width="${mod - 1.6}" height="${mod - 1.6}" rx="2.5" fill="url(#modGrad)"/>`;
    }
  }

  // Draw the 3 finder patterns as styled blocks
  function finderBlock(row, col) {
    const x = offX + col * mod;
    const y = offY + row * mod;
    const s = 7 * mod;
    // Outer square
    let out = `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="5" fill="url(#finderOuter)"/>`;
    // White ring
    out += `<rect x="${x + mod}" y="${y + mod}" width="${5 * mod}" height="${5 * mod}" rx="3" fill="white"/>`;
    // Inner square
    out += `<rect x="${x + 2 * mod}" y="${y + 2 * mod}" width="${3 * mod}" height="${3 * mod}" rx="2" fill="url(#finderInner)"/>`;
    return out;
  }

  finderRects = finderBlock(0, 0) +
                finderBlock(0, size - 7) +
                finderBlock(size - 7, 0);

  // ── Petal / rose decorations (SVG paths) ──
  const petals = `
    <!-- Top-left rose cluster -->
    <g transform="translate(38,70) rotate(-25)">
      <ellipse cx="0" cy="-14" rx="9" ry="16" fill="#C41E3A" opacity="0.75"/>
      <ellipse cx="12" cy="-8" rx="9" ry="16" fill="#E8607A" opacity="0.65" transform="rotate(50)"/>
      <ellipse cx="-12" cy="-8" rx="9" ry="16" fill="#9B1230" opacity="0.65" transform="rotate(-50)"/>
      <circle cx="0" cy="0" r="6" fill="#6B0020"/>
    </g>
    <!-- Top-right rose cluster -->
    <g transform="translate(${W - 38},70) rotate(25)">
      <ellipse cx="0" cy="-14" rx="9" ry="16" fill="#C41E3A" opacity="0.75"/>
      <ellipse cx="12" cy="-8" rx="9" ry="16" fill="#E8607A" opacity="0.65" transform="rotate(50)"/>
      <ellipse cx="-12" cy="-8" rx="9" ry="16" fill="#9B1230" opacity="0.65" transform="rotate(-50)"/>
      <circle cx="0" cy="0" r="6" fill="#6B0020"/>
    </g>
    <!-- Bottom-left petal -->
    <g transform="translate(48,${H - 68}) rotate(15)">
      <ellipse cx="0" cy="-12" rx="7" ry="13" fill="#FF4D6D" opacity="0.6"/>
      <ellipse cx="10" cy="-6" rx="7" ry="13" fill="#C41E3A" opacity="0.5" transform="rotate(55)"/>
      <circle cx="0" cy="0" r="5" fill="#800020"/>
    </g>
    <!-- Bottom-right petal -->
    <g transform="translate(${W - 48},${H - 68}) rotate(-15)">
      <ellipse cx="0" cy="-12" rx="7" ry="13" fill="#FF4D6D" opacity="0.6"/>
      <ellipse cx="-10" cy="-6" rx="7" ry="13" fill="#C41E3A" opacity="0.5" transform="rotate(-55)"/>
      <circle cx="0" cy="0" r="5" fill="#800020"/>
    </g>

    <!-- Scattered small hearts -->
    <text x="22" y="${H - 110}" font-size="14" fill="#FF4D6D" opacity="0.7">♥</text>
    <text x="${W - 30}" y="45" font-size="12" fill="#FF4D6D" opacity="0.6">♥</text>
    <text x="${cx - 8}" y="42" font-size="18" fill="#C41E3A" opacity="0.8">♥</text>
    <text x="62" y="${H - 44}" font-size="11" fill="#E8607A" opacity="0.7">♥</text>
    <text x="${W - 66}" y="${H - 44}" font-size="11" fill="#E8607A" opacity="0.7">♥</text>

    <!-- Sparkles -->
    <text x="18" y="130" font-size="12" fill="#FFB3C1" opacity="0.8">✦</text>
    <text x="${W - 26}" y="130" font-size="12" fill="#FFB3C1" opacity="0.8">✦</text>
    <text x="28" y="${H - 130}" font-size="10" fill="#FFB3C1" opacity="0.6">✦</text>
    <text x="${W - 36}" y="${H - 130}" font-size="10" fill="#FFB3C1" opacity="0.6">✦</text>
  `;

  // ── Full SVG ──
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${W}" height="${H}"
     viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient: deep romantic dark -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#1A0010"/>
      <stop offset="50%"  stop-color="#2D0018"/>
      <stop offset="100%" stop-color="#1A0010"/>
    </linearGradient>

    <!-- QR module gradient: pink → crimson -->
    <linearGradient id="modGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#FF4D6D"/>
      <stop offset="100%" stop-color="#9B1230"/>
    </linearGradient>

    <!-- Finder outer -->
    <linearGradient id="finderOuter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#C41E3A"/>
      <stop offset="100%" stop-color="#6B0020"/>
    </linearGradient>

    <!-- Finder inner -->
    <linearGradient id="finderInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#FF4D6D"/>
      <stop offset="100%" stop-color="#C41E3A"/>
    </linearGradient>

    <!-- Card shadow -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#C41E3A" flood-opacity="0.4"/>
    </filter>

    <!-- Soft glow for title -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>

    <!-- Ornamental border pattern -->
    <pattern id="dotPat" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1" fill="#C41E3A" opacity="0.25"/>
    </pattern>
  </defs>

  <!-- ── Background ── -->
  <rect width="${W}" height="${H}" fill="url(#bg)" rx="18"/>
  <rect width="${W}" height="${H}" fill="url(#dotPat)" rx="18" opacity="0.5"/>

  <!-- ── Outer decorative border ── -->
  <rect x="8" y="8" width="${W - 16}" height="${H - 16}"
        fill="none" stroke="#C41E3A" stroke-width="1.5" stroke-opacity="0.35"
        rx="14" stroke-dasharray="6,4"/>

  <!-- ── Decorations ── -->
  ${petals}

  <!-- ── Title ── -->
  <text x="${cx}" y="58" font-family="Georgia, 'Times New Roman', serif"
        font-size="22" font-style="italic" font-weight="bold"
        fill="#FFB3C1" text-anchor="middle" filter="url(#glow)">Luthfia Deanis</text>

  <text x="${cx}" y="76" font-family="Georgia, serif"
        font-size="10" fill="#C41E3A" opacity="0.8" text-anchor="middle"
        letter-spacing="3">✦ &amp; Haydar ✦</text>

  <!-- ── QR Card (white background) ── -->
  <rect x="${offX - pad}" y="88" width="${cardW}" height="${cardH}"
        rx="16" fill="white" filter="url(#cardShadow)"/>

  <!-- Thin pink border on card -->
  <rect x="${offX - pad + 4}" y="92" width="${cardW - 8}" height="${cardH - 8}"
        rx="13" fill="none" stroke="#FFB3C1" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- ── QR Code ── -->
  <!-- Light modules (background) already white from card -->

  <!-- Finder patterns -->
  ${finderRects}

  <!-- Data modules -->
  ${modules}

  <!-- ── Bottom text ── -->
  <text x="${cx}" y="${88 + cardH + 36}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="13" font-style="italic"
        fill="#FFB3C1" text-anchor="middle" opacity="0.9">
    Scan untuk membuka kisah cinta kita 🌹
  </text>

  <text x="${cx}" y="${88 + cardH + 56}"
        font-family="'Courier New', monospace"
        font-size="8.5" fill="#C41E3A" opacity="0.55"
        text-anchor="middle" letter-spacing="0.5">
    happy-b-day-piaaaa.vercel.app
  </text>

  <!-- Bottom heart row -->
  <text x="${cx}" y="${88 + cardH + 78}"
        font-size="14" fill="#C41E3A" opacity="0.7"
        text-anchor="middle">♥ ♥ ♥</text>

</svg>`;

  const outSvg = path.join(__dirname, 'public', 'qr-romantic.svg');
  fs.writeFileSync(outSvg, svg, 'utf8');
  console.log('SUCCESS → saved to', outSvg);
  console.log('Canvas:', W, 'x', H);
}

generateRomanticQR().catch(console.error);
