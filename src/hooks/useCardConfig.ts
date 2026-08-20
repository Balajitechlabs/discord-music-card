import { useState } from 'react';

const CARD_THEMES = {
  dark: {
    bg: '#141414',
    border: '#27272a',
    title: '#ffffff',
    name: '#ffffff',
    text: '#b0b0b0',
    time: '#b0b0b0',
    barBg: '#424242',
    barFg: '#ffffff'
  },
  light: {
    bg: '#ffffff',
    border: '#e4e4e7',
    title: '#09090b',
    name: '#09090b',
    text: '#52525b',
    time: '#b0b0b0',
    barBg: '#e4e4e7',
    barFg: '#18181b'
  }
};

const DEFAULTS = {
    ...CARD_THEMES.dark,
    profile: false,
    decoration: false,
    smallImage: true,
    displayName: false,
    advancedColors: false
};

export interface CardConfig {
    // Toggles
    showProfile: boolean;
    setShowProfile: (show: boolean) => void;
    showDecoration: boolean;
    setShowDecoration: (show: boolean) => void;
    showSmallImage: boolean;
    setShowSmallImage: (show: boolean) => void;
    useDisplayName: boolean;
    setUseDisplayName: (use: boolean) => void;
    showAdvancedColors: boolean;
    setShowAdvancedColors: (show: boolean) => void;

    // Colors
    bgColor: string;
    setBgColor: (color: string) => void;
    borderColor: string;
    setBorderColor: (color: string) => void;
    titleColor: string;
    setTitleColor: (color: string) => void;
    nameColor: string;
    setNameColor: (color: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    timeColor: string;
    setTimeColor: (color: string) => void;
    barBgColor: string;
    setBarBgColor: (color: string) => void;
    barFgColor: string;
    setBarFgColor: (color: string) => void;

    // Logic
    resetColors: () => void;
    applyTheme: (theme: 'dark' | 'light') => void;
    genQueryParams: (idsToHide?: string[], cacheBuster?: number) => URLSearchParams;
    
    // Hidden IDs
    hiddenIds: string[];
    setHiddenIds: (ids: string[]) => void;
}

export function useCardConfig(initialHiddenIds: string[] = []): CardConfig {
    // Colors
    const [bgColor, setBgColor] = useState(DEFAULTS.bg);
    const [borderColor, setBorderColor] = useState(DEFAULTS.border);
    const [titleColor, setTitleColor] = useState(DEFAULTS.title);
    const [nameColor, setNameColor] = useState(DEFAULTS.name);
    const [textColor, setTextColor] = useState(DEFAULTS.text);
    const [timeColor, setTimeColor] = useState(DEFAULTS.time);
    const [barBgColor, setBarBgColor] = useState(DEFAULTS.barBg);
    const [barFgColor, setBarFgColor] = useState(DEFAULTS.barFg);

    // Toggles
    const [showProfile, setShowProfile] = useState(DEFAULTS.profile);
    const [showDecoration, setShowDecoration] = useState(DEFAULTS.decoration);
    const [showSmallImage, setShowSmallImage] = useState(DEFAULTS.smallImage);
    const [useDisplayName, setUseDisplayName] = useState(DEFAULTS.displayName);
    const [showAdvancedColors, setShowAdvancedColors] = useState(DEFAULTS.advancedColors);

    // Hidden IDs
    const [hiddenIds, setHiddenIds] = useState<string[]>(initialHiddenIds);

    const applyTheme = (theme: 'dark' | 'light') => {
        const preset = CARD_THEMES[theme];
        setBgColor(preset.bg);
        setBorderColor(preset.border);
        setTitleColor(preset.title);
        setNameColor(preset.name);
        setTextColor(preset.text);
        setTimeColor(preset.time);
        setBarBgColor(preset.barBg);
        setBarFgColor(preset.barFg);
    };

    const resetColors = () => {
        applyTheme('dark');
        setShowProfile(DEFAULTS.profile);
        setShowDecoration(DEFAULTS.decoration);
        setShowSmallImage(DEFAULTS.smallImage);
        setUseDisplayName(DEFAULTS.displayName);
        setShowAdvancedColors(DEFAULTS.advancedColors);
        setHiddenIds([]);
    };

    const genQueryParams = (idsToHide: string[] = hiddenIds, cacheBuster?: number) => {
        const p = new URLSearchParams();
        if (bgColor !== DEFAULTS.bg) p.append('bg', bgColor.replace('#', ''));
        if (borderColor !== DEFAULTS.border) p.append('border', borderColor.replace('#', ''));
        if (titleColor !== DEFAULTS.title) p.append('title', titleColor.replace('#', ''));
        if (nameColor !== DEFAULTS.name) p.append('name_color', nameColor.replace('#', ''));
        if (textColor !== DEFAULTS.text) p.append('text', textColor.replace('#', ''));
        if (timeColor !== DEFAULTS.time) p.append('time', timeColor.replace('#', ''));
        if (barBgColor !== DEFAULTS.barBg) p.append('bar_bg', barBgColor.replace('#', ''));
        if (barFgColor !== DEFAULTS.barFg) p.append('bar_fg', barFgColor.replace('#', ''));
        
        if (showProfile) p.append('profile', 'true');
        if (showDecoration) p.append('decoration', 'true');
        if (showSmallImage) p.append('small_image', 'true');
        if (useDisplayName) p.append('name_type', 'display');
        
        if (idsToHide.length > 0) p.append('hide_ids', idsToHide.join(','));
        if (cacheBuster) p.append('_t', cacheBuster.toString());
        
        return p;
    };

    return {
        showProfile, setShowProfile,
        showDecoration, setShowDecoration,
        showSmallImage, setShowSmallImage,
        useDisplayName, setUseDisplayName,
        showAdvancedColors, setShowAdvancedColors,
        bgColor, setBgColor,
        borderColor, setBorderColor,
        titleColor, setTitleColor,
        nameColor, setNameColor,
        textColor, setTextColor,
        timeColor, setTimeColor,
        barBgColor, setBarBgColor,
        barFgColor, setBarFgColor,
        resetColors,
        applyTheme,
        genQueryParams,
        hiddenIds, setHiddenIds
    };
}

