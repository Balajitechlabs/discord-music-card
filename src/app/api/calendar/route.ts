import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    try {
        const upstreamUrl = `https://raw.githubusercontent.com/Balajitechlabs/balajitechlabs/main/icons/calendar.svg?_t=${Date.now()}`;

        const res = await fetch(upstreamUrl, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!res.ok) {
            return new NextResponse('Error fetching calendar', { status: res.status });
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
