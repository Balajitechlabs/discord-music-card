
const THEME_PRESETS: Record<string, Partial<Record<string, string>>> = {
    spotify: {
        bg: '#121212',
        border: '#1db954',
        title: '#ffffff',
        name_color: '#ffffff',
        text: '#b3b3b3',
        time: '#1db954',
        bar_bg: '#282828',
        bar_fg: '#1db954'
    },
    apple: {
        bg: '#1c1c1e',
        border: '#fc3c44',
        title: '#ffffff',
        name_color: '#ffffff',
        text: '#aeaeb2',
        time: '#fc3c44',
        bar_bg: '#2c2c2e',
        bar_fg: '#fc3c44'
    },
    cyberpunk: {
        bg: '#0d0d15',
        border: '#00f0ff',
        title: '#ff007f',
        name_color: '#00f0ff',
        text: '#00f0ff',
        time: '#ff007f',
        bar_bg: '#1a1a2e',
        bar_fg: '#00f0ff'
    },
    neon: {
        bg: '#0a0a0f',
        border: '#8b5cf6',
        title: '#a78bfa',
        name_color: '#c4b5fd',
        text: '#94a3b8',
        time: '#a78bfa',
        bar_bg: '#1e1b4b',
        bar_fg: '#8b5cf6'
    }
};

export function parseConfig(searchParams: URLSearchParams) {
    const theme = searchParams.get('theme')?.toLowerCase();
    const preset = theme && THEME_PRESETS[theme] ? THEME_PRESETS[theme] : {};

    return {
        bg: searchParams.get('bg') ? `#${searchParams.get('bg')}` : (preset.bg || '#18181b'),
        border: searchParams.get('border') ? `#${searchParams.get('border')}` : (preset.border || '#27272a'),
        title: searchParams.get('title') ? `#${searchParams.get('title')}` : (preset.title || '#ffffff'),
        name: searchParams.get('name_color') ? `#${searchParams.get('name_color')}` : (preset.name_color || '#ffffff'),
        text: searchParams.get('text') ? `#${searchParams.get('text')}` : (preset.text || '#b0b0b0'),
        time: searchParams.get('time') ? `#${searchParams.get('time')}` : (preset.time || '#b0b0b0'),
        barBg: searchParams.get('bar_bg') ? `#${searchParams.get('bar_bg')}` : (preset.bar_bg || '#27272a'),
        barFg: searchParams.get('bar_fg') ? `#${searchParams.get('bar_fg')}` : (preset.bar_fg || '#22c55e'),
        showProfile: searchParams.get('profile') === 'true',
        showSmall: searchParams.get('small_image') !== 'false',
        showDecoration: searchParams.get('decoration') === 'true',
        nameType: searchParams.get('name_type') || 'display',
        ambient: searchParams.get('ambient') !== 'false',
        mode: searchParams.get('mode') || 'default',
        theme: theme || 'default',
        hiddenIds: (searchParams.get('hide_ids') || '').split(',').filter(Boolean).map(id => id.trim().toLowerCase())
    };
}
