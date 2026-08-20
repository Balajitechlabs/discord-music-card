import { NextRequest, NextResponse } from 'next/server';
import { createRequire } from 'module';
import { getLanyardData, filterActivity } from '@/lib/lanyard';
import { parseConfig } from '@/utils/params';
import { processImages } from '@/utils/images';
import { StatusCard } from '@/components/cards/StatusCard';

export const runtime = 'nodejs';

const require = createRequire(import.meta.url);
const ReactDOMServer = require('react-dom/server');

function generateErrorCard(message: string, subMessage: string, width = 400, height = 120, bg = '#141414', border = '#27272A', text = '#ffffff') {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="${width-1}" height="${height-1}" fill="${bg}" stroke="${border}" rx="12"/><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%"><style>.c{font-family:'Inter',sans-serif,system-ui;text-align:center;color:${text};padding:20px}.t{font-weight:700;font-size:1rem;margin-bottom:4px;color:#ef4444}.d{font-size:0.85rem;opacity:0.8}</style><div class="c"><div class="t">${message}</div><div class="d">${subMessage}</div></div></div></foreignObject></svg>`;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const config = parseConfig(searchParams);

    if (!id) return new NextResponse(generateErrorCard('Missing ID', 'Provide Discord User ID.', 400, 100, config.bg, config.border, config.title), { headers: { 'Content-Type': 'image/svg+xml' } });

    let data;
    try {
        data = await getLanyardData(id, searchParams, config);
        if (!data) {
             return new NextResponse(generateErrorCard('User Not Found', 'Make sure you have joined the Lanyard Discord server', 400, 120, config.bg, config.border, config.title), { headers: { 'Content-Type': 'image/svg+xml' } });
        }
    } catch {
         return new NextResponse(generateErrorCard('Internal Error', 'Failed to fetch Lanyard.', 400, 100, config.bg, config.border, config.title), { status: 500, headers: {'Content-Type': 'image/svg+xml'} });
    }

    const activity = filterActivity(data, config);
    const images = await processImages(data, config, activity);

    const svgString = ReactDOMServer.renderToStaticMarkup(
                    <StatusCard 
                        config={config} 
                        data={data} 
                        activity={activity} 
                        images={images}
                        currentTimestamp={Date.now()}
                    />    );

    return new NextResponse(svgString, {
        headers: { 
            'Content-Type': 'image/svg+xml', 
            'Cache-Control': 'public, max-age=0, s-maxage=0, must-revalidate, no-cache' 
        },
    });
}