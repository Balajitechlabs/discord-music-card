import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ project: string }> }
) {
    try {
        const { project } = await context.params;

        let iconName = 'card_quickdash_top.svg';
        if (project === 'quickdash') {
            iconName = 'card_quickdash_top.svg';
        } else if (project === 'btl' || project === 'balajitechlab.com') {
            iconName = 'card_btl_top.svg';
        } else {
            return new NextResponse('Project not found', { status: 404 });
        }

        const upstreamUrl = `https://raw.githubusercontent.com/Balajitechlabs/balajitechlabs/main/icons/${iconName}?_t=${Date.now()}`;

        const res = await fetch(upstreamUrl, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!res.ok) {
            return new NextResponse('Error fetching project card', { status: res.status });
        }

        const svg = await res.text();

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=0, s-maxage=0, must-revalidate, no-cache',
            },
        });
    } catch {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
