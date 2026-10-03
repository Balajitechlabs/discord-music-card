import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function generateErrorCard(
    message: string,
    subMessage: string,
    width = 400,
    height = 120,
    bg = '#141414',
    border = '#27272A',
    text = '#ffffff'
) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="${bg}" stroke="${border}" rx="12"/><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%"><style>.c{font-family:'Inter',sans-serif,system-ui;text-align:center;color:${text};padding:20px}.t{font-weight:700;font-size:1rem;margin-bottom:4px;color:#ef4444}.d{font-size:0.85rem;opacity:0.8}</style><div class="c"><div class="t">${message}</div><div class="d">${subMessage}</div></div></div></foreignObject></svg>`;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ user: string }> }
) {
    const { user } = await params;
    const searchParams = request.nextUrl.searchParams;
    const count = searchParams.get('count') || '3';
    const bg = searchParams.get('bg_color') || '000000';
    const text = searchParams.get('text_color') || 'ffffff';
    const artist = searchParams.get('artist_color') || '888888';
    const accent = searchParams.get('accent_color') || 'ffffff';
    const radius = searchParams.get('radius') || '14';

    try {
        const upstreamUrl = `https://lastfm-recently-played.jeffreyca.workers.dev/svg?user=${encodeURIComponent(user || 'Btl-music')}&count=${encodeURIComponent(count)}&bg_color=${encodeURIComponent(bg)}&text_color=${encodeURIComponent(text)}&artist_color=${encodeURIComponent(artist)}&accent_color=${encodeURIComponent(accent)}&radius=${encodeURIComponent(radius)}&_t=${Date.now()}`;

        const res = await fetch(upstreamUrl, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DiscordMusicCard/1.0)',
            },
        });

        if (!res.ok) {
            return new NextResponse(
                generateErrorCard('Last.fm Error', `Failed to load scrobbles (${res.status})`, 400, 100),
                { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        }

        const svg = await res.text();

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=0, s-maxage=0, must-revalidate, no-cache',
            },
        });
    } catch {
        return new NextResponse(
            generateErrorCard('Internal Error', 'Failed to fetch Last.fm scrobbles.', 400, 100),
            {
                status: 500,
                headers: { 'Content-Type': 'image/svg+xml' },
            }
        );
    }
}
