import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function generateErrorCard(
    message: string,
    subMessage: string,
    width = 495,
    height = 195,
    bg = '#000000',
    border = '#2A2A2A',
    text = '#ffffff'
) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="${bg}" stroke="${border}" rx="12"/><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%"><style>.c{font-family:'Inter',sans-serif,system-ui;text-align:center;color:${text};padding:20px}.t{font-weight:700;font-size:1rem;margin-bottom:4px;color:#ef4444}.d{font-size:0.85rem;opacity:0.8}</style><div class="c"><div class="t">${message}</div><div class="d">${subMessage}</div></div></div></foreignObject></svg>`;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const params = new URLSearchParams({
        username: searchParams.get('username') || 'Balajitechlabs',
        show_icons: searchParams.get('show_icons') || 'true',
        bg_color: searchParams.get('bg_color') || '000000',
        title_color: searchParams.get('title_color') || 'FFFFFF',
        text_color: searchParams.get('text_color') || 'A0A0A0',
        icon_color: searchParams.get('icon_color') || 'FFFFFF',
        border_color: searchParams.get('border_color') || '2A2A2A',
        _t: Date.now().toString(),
    });

    try {
        const upstreamUrl = `https://github-readme-stats.vercel.app/api?${params.toString()}`;

        const res = await fetch(upstreamUrl, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/svg+xml,*/*',
            },
        });

        if (!res.ok) {
            return new NextResponse(
                generateErrorCard('Profile Stats Error', `Failed to load GitHub stats (${res.status})`),
                { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } }
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
            generateErrorCard('Internal Error', 'Failed to fetch GitHub stats.'),
            {
                status: 500,
                headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
            }
        );
    }
}
