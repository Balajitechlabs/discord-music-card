import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FALLBACK_FOOTER_SVG = `<svg width="860" height="180" viewBox="0 0 860 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="laserPulse" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="25%" stop-color="#ffffff" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="75%" stop-color="#ffffff" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      <animate attributeName="x1" values="-100%;150%" dur="3.5s" repeatCount="indefinite" />
      <animate attributeName="x2" values="0%;250%" dur="3.5s" repeatCount="indefinite" />
    </linearGradient>
    <linearGradient id="obsidianDeep" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0e0e0e" stop-opacity="0.75" />
      <stop offset="40%" stop-color="#080808" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#000000" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="titaniumMid" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1c1c1c" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#0a0a0a" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#000000" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="badgeBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#444444" />
      <stop offset="50%" stop-color="#1f1f1f" />
      <stop offset="100%" stop-color="#333333" />
    </linearGradient>
  </defs>
  <style>
    .wave-deep-path { fill: url(#obsidianDeep); }
    .wave-mid-path { fill: url(#titaniumMid); }
    .wave-back-wire { stroke: #222222; stroke-width: 1; fill: none; stroke-dasharray: 4 4; opacity: 0.5; }
    .wave-crest-base { stroke: #2a2a2a; stroke-width: 1.2; fill: none; }
    .wave-crest-laser { stroke: url(#laserPulse); stroke-width: 2.2; fill: none; stroke-linecap: round; }
    .badge-card { fill: #000000; stroke: url(#badgeBorderGrad); stroke-width: 1.2; rx: 8px; }
    .badge-shine { stroke: #444444; stroke-width: 1; stroke-linecap: round; }
    .badge-title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace; font-size: 9.5px; font-weight: 800; fill: #ffffff; letter-spacing: 1px; }
    .badge-icon { fill: #ffffff; }
    .live-dot { fill: #00ff88; }
    .pill-bg { fill: #ffffff; rx: 5px; }
    .pill-num { font-family: 'SF Mono', -apple-system, monospace; font-size: 11px; font-weight: 900; fill: #000000; letter-spacing: 0.5px; }
    .sig-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; font-size: 12.5px; fill: #777777; letter-spacing: 0.4px; }
    .sig-name { font-family: 'SF Mono', monospace; font-weight: 800; fill: #ffffff; letter-spacing: 0.5px; }
    @media (prefers-color-scheme: light) {
      .wave-deep-path { fill: #f5f5f5; }
      .wave-mid-path { fill: #eaeaea; }
      .wave-back-wire { stroke: #d0d0d0; }
      .wave-crest-base { stroke: #cccccc; }
      .badge-card { fill: #ffffff; stroke: #000000; }
      .badge-shine { stroke: #cccccc; }
      .badge-title { fill: #000000; }
      .badge-icon { fill: #000000; }
      .pill-bg { fill: #000000; }
      .pill-num { fill: #ffffff; }
      .sig-text { fill: #555555; }
      .sig-name { fill: #000000; }
    }
  </style>
  <path class="wave-back-wire" d="M 0 55 C 140 25, 290 85, 430 55 C 570 25, 720 85, 860 55">
    <animate attributeName="d" values="M 0 55 C 140 25, 290 85, 430 55 C 570 25, 720 85, 860 55; M 0 55 C 140 85, 290 25, 430 55 C 570 85, 720 25, 860 55; M 0 55 C 140 25, 290 85, 430 55 C 570 25, 720 85, 860 55" dur="7s" repeatCount="indefinite" />
  </path>
  <path class="wave-deep-path" d="M 0 45 C 140 15, 290 70, 430 45 C 570 20, 720 70, 860 45 L 860 180 L 0 180 Z">
    <animate attributeName="d" values="M 0 45 C 140 15, 290 70, 430 45 C 570 20, 720 70, 860 45 L 860 180 L 0 180 Z; M 0 45 C 140 70, 290 20, 430 45 C 570 70, 720 15, 860 45 L 860 180 L 0 180 Z; M 0 45 C 140 15, 290 70, 430 45 C 570 20, 720 70, 860 45 L 860 180 L 0 180 Z" dur="6s" repeatCount="indefinite" />
  </path>
  <path class="wave-mid-path" d="M 0 35 C 140 60, 290 10, 430 35 C 570 60, 720 10, 860 35 L 860 180 L 0 180 Z">
    <animate attributeName="d" values="M 0 35 C 140 60, 290 10, 430 35 C 570 60, 720 10, 860 35 L 860 180 L 0 180 Z; M 0 35 C 140 10, 290 60, 430 35 C 570 10, 720 60, 860 35 L 860 180 L 0 180 Z; M 0 35 C 140 60, 290 10, 430 35 C 570 60, 720 10, 860 35 L 860 180 L 0 180 Z" dur="4.8s" repeatCount="indefinite" />
  </path>
  <path class="wave-crest-base" d="M 0 25 C 140 0, 290 50, 430 25 C 570 0, 720 50, 860 25">
    <animate attributeName="d" values="M 0 25 C 140 0, 290 50, 430 25 C 570 0, 720 50, 860 25; M 0 25 C 140 50, 290 0, 430 25 C 570 50, 720 0, 860 25; M 0 25 C 140 0, 290 50, 430 25 C 570 0, 720 50, 860 25" dur="4s" repeatCount="indefinite" />
  </path>
  <path class="wave-crest-laser" d="M 0 25 C 140 0, 290 50, 430 25 C 570 0, 720 50, 860 25">
    <animate attributeName="d" values="M 0 25 C 140 0, 290 50, 430 25 C 570 0, 720 50, 860 25; M 0 25 C 140 50, 290 0, 430 25 C 570 50, 720 0, 860 25; M 0 25 C 140 0, 290 50, 430 25 C 570 0, 720 50, 860 25" dur="4s" repeatCount="indefinite" />
  </path>
  <g transform="translate(325, 68)">
    <rect x="0" y="0" width="210" height="34" rx="8" class="badge-card" />
    <line x1="8" y1="1" x2="202" y2="1" class="badge-shine" />
    <g transform="translate(12, 9) scale(0.95)">
      <path class="badge-icon" d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"/>
    </g>
    <text x="36" y="21.5" class="badge-title">PROFILE VIEWS</text>
    <rect x="136" y="5" width="66" height="24" rx="5" class="pill-bg" />
    <circle cx="147" cy="17" r="2.5" class="live-dot" />
    <text x="173" y="21.5" text-anchor="middle" class="pill-num count-text">__COUNT__+</text>
  </g>
  <text x="430" y="142" text-anchor="middle" class="sig-text">
    © 2026 <tspan class="sig-name">||BTL||™</tspan> · Designed with Pure <tspan fill="#ff3b30">❤️</tspan>
  </text>
</svg>`;

export async function GET(request: NextRequest) {
    let countStr = '1,541';

    // 1. Fetch live count from Komarev (this pings & increments on every visit)
    try {
        const komarevRes = await fetch('https://komarev.com/ghpvc/?username=Balajitechlabs', {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });
        if (komarevRes.ok) {
            const komarevSvg = await komarevRes.text();
            const match = komarevSvg.match(/>([0-9,]+)</);
            if (match && match[1]) {
                countStr = match[1];
            }
        }
    } catch {
        // Fallback to default/cached count if Komarev network glitch
    }

    // 2. Fetch base SVG from GitHub, or use embedded fallback
    let svgTemplate = FALLBACK_FOOTER_SVG;
    try {
        const upstreamUrl = `https://raw.githubusercontent.com/Balajitechlabs/balajitechlabs/main/icons/footer_wave.svg?_t=${Date.now()}`;
        const res = await fetch(upstreamUrl, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });
        if (res.ok) {
            svgTemplate = await res.text();
        }
    } catch {
        // keep FALLBACK_FOOTER_SVG
    }

    // 3. Inject current count
    let finalSvg = svgTemplate.replace(
        /class="pill-num count-text">[^<]+</,
        `class="pill-num count-text">${countStr}+<`
    );
    finalSvg = finalSvg.replace('__COUNT__', countStr);

    return new NextResponse(finalSvg, {
        headers: {
            'Content-Type': 'image/svg+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=0, must-revalidate, no-cache',
        },
    });
}
