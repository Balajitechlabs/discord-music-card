export interface Config {
    bg: string;
    border: string;
    title: string;
    name: string;
    text: string;
    time: string;
    barBg: string;
    barFg: string;
    showProfile: boolean;
    showDecoration: boolean;
    showSmall: boolean;
    nameType: string;
    theme?: string;
    ambient?: boolean;
    mode?: string;
    hiddenIds: string[];
    [key: string]: unknown;
}

export interface DiscordUser {
    id: string;
    username: string;
    global_name?: string | null;
    avatar?: string | null;
    avatar_decoration?: string | null;
    avatar_decoration_data?: {
        asset: string;
        sku_id?: string;
    };
}

export interface Timestamps {
    start: number;
    end?: number;
}

export interface Assets {
    large_image?: string;
    small_image?: string;
    large_text?: string;
    small_text?: string;
}

export interface Activity {
    type: number;
    name: string;
    details?: string;
    state?: string;
    application_id?: string;
    timestamps?: Timestamps;
    assets?: Assets;
}

export interface LanyardData {
    discord_user: DiscordUser;
    discord_status: string;
    activities: Activity[];
}
