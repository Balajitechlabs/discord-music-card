import { PLACEHOLDER_DARK, PLACEHOLDER_LIGHT } from '@/constants/assets';
import { getDemoAsset } from '@/constants/demo';
import { LanyardData, Config, Activity } from '@/types';

export async function imageToBase64(url: string): Promise<string> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`Image fetch failed`);
        const arrayBuffer = await response.arrayBuffer();
        return `data:${response.headers.get('content-type') || 'image/png'};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
    } catch {
        return '';
    }
}

export function getImage(appId: string, asset: string) {
    if (!asset) return '';
    if (asset.startsWith('spotify:')) return `https://i.scdn.co/image/${asset.replace('spotify:', '')}`;
    if (asset.startsWith('mp:external')) return `https://media.discordapp.net/${asset.substring(3)}`;
    return `https://cdn.discordapp.com/app-assets/${appId}/${asset}.png`;
}

async function resolveImage(assetKey: string | undefined, appId: string | undefined, isDemo: boolean, allowFallback: boolean = true): Promise<string> {
    if (!assetKey && !appId) return '';

    // Demo Asset
    if (isDemo && assetKey) {
        const demoAsset = getDemoAsset(assetKey);
        if (demoAsset) return demoAsset;
    }

    // Determine URL
    let url = '';
    if (assetKey) {
        if (assetKey.startsWith('spotify:') || assetKey.startsWith('mp:external') || appId) {
            url = getImage(appId || '', assetKey);
        }
    } 
    // Fallback App Icon
    if (allowFallback && !url && appId && !assetKey) { 
         url = `https://dcdn.dstn.to/app-icons/${appId}.png?size=128`;
    }

    // Fetch Base64
    if (url) {
        return await imageToBase64(url);
    }

    return '';
}

export async function processImages(data: LanyardData, config: Config, activity: Activity | null | undefined) {
    const isLight = config.bg.toLowerCase().includes('fff') || config.bg.toLowerCase().includes('f2f3f5');
    const placeholder = isLight ? PLACEHOLDER_LIGHT : PLACEHOLDER_DARK;
    const isDemo = data.discord_user.id === 'demo';

    let imageAsBase64 = placeholder;
    let smallImageAsBase64 = '';
    let avatarBase64 = '';
    let decorationBase64 = '';

    // Activity Images
    if (activity) {
        const appId = activity.application_id;
        
        // Large Image
        const largeRes = await resolveImage(activity.assets?.large_image, appId, isDemo, true);
        
        // Special case
        if (isDemo && !largeRes && activity.name === 'Spotify') {
             imageAsBase64 = getDemoAsset('demo_spotify') || placeholder;
        } else if (largeRes) {
             imageAsBase64 = largeRes;
        } else if (!activity.assets?.large_image && appId) {
             // Explicit fallback
             imageAsBase64 = await resolveImage(undefined, appId, isDemo, true) || placeholder;
        }

        // Small Image
        if (config.showSmall) {
            smallImageAsBase64 = await resolveImage(activity.assets?.small_image, appId, isDemo, false);
        }
    }

    // Profile Images - Always fetch so it can be shown in offline/idle cards
    if (isDemo) {
        avatarBase64 = getDemoAsset('demo_avatar') || placeholder;
        if (config.showDecoration) decorationBase64 = getDemoAsset('demo_decoration') || '';
    } else if (data.discord_user.avatar) {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`;
        avatarBase64 = await imageToBase64(avatarUrl) || placeholder;

        if (config.showDecoration && data.discord_user.avatar_decoration_data) {
            const decoHash = data.discord_user.avatar_decoration_data.asset;
            const rawDecoUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${decoHash}.png?size=160`;
            const staticDecoUrl = `https://wsrv.nl/?url=${encodeURIComponent(rawDecoUrl)}&output=png`;
            decorationBase64 = await imageToBase64(staticDecoUrl);
        }
    } else {
        avatarBase64 = placeholder;
    }

    return { imageAsBase64, smallImageAsBase64, avatarBase64, decorationBase64 };
}