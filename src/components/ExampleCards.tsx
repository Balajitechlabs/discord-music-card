'use client';

import { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';
import CustomizationPanel from './CustomizationPanel';
import { useCardConfig } from '@/hooks/useCardConfig';

interface ExampleCardsProps {
    hiddenIds?: string[];
    setHiddenIds?: (ids: string[]) => void;
}

export default function ExampleCards({ hiddenIds = [], setHiddenIds }: ExampleCardsProps) {
    // Config
    const cardConfig = useCardConfig();
    const { 
        bgColor, borderColor, titleColor, nameColor, textColor, timeColor, barBgColor, barFgColor,
        showProfile, showDecoration, showSmallImage, useDisplayName
    } = cardConfig;
    
    // UI State
    const [showCustomization, setShowCustomization] = useState(false);
    const [cacheBuster] = useState(0);

    // URL Logic
    const getBaseParams = (idsToHide: string[]) => {
        const p = new URLSearchParams();
        p.append('bg', bgColor.replace('#', ''));
        p.append('border', borderColor.replace('#', ''));
        p.append('title', titleColor.replace('#', ''));
        p.append('name_color', nameColor.replace('#', ''));
        p.append('text', textColor.replace('#', ''));
        p.append('time', timeColor.replace('#', ''));
        p.append('bar_bg', barBgColor.replace('#', ''));
        p.append('bar_fg', barFgColor.replace('#', ''));
        p.append('profile', showProfile.toString());
        p.append('decoration', showDecoration.toString());
        p.append('name_type', useDisplayName ? 'display' : 'username');
        
        if (idsToHide.length > 0) {
            p.append('hide_ids', idsToHide.join(','));
        }
        p.append('_t', cacheBuster.toString());
        return p;
    };

    const spotifyHiddenIds = hiddenIds.filter(id => id.toLowerCase().includes('spotify'));
    const gameHiddenIds = hiddenIds.filter(id => {
        const lower = id.toLowerCase();
        return lower.includes('red dead redemption 2') || lower.includes('demo_app');
    });

    // URLs
    const pendingSpotifyParams = getBaseParams(spotifyHiddenIds);
    const pendingGameParams = getBaseParams(gameHiddenIds);
    pendingGameParams.append('small_image', showSmallImage.toString());

    const pendingSpotifyUrl = `/api/status/demo?type=spotify&${pendingSpotifyParams.toString()}`;
    const pendingGameUrl = `/api/status/demo?type=game&${pendingGameParams.toString()}`;

    // Active State
    const [activeSpotifyUrl, setActiveSpotifyUrl] = useState(pendingSpotifyUrl);
    const [activeGameUrl, setActiveGameUrl] = useState(pendingGameUrl);
    const loadRequestId = useRef(0);

    // Image Load State
    const [spotifyLoaded, setSpotifyLoaded] = useState(false);
    const [gameLoaded, setGameLoaded] = useState(false);

    // Sync Images
    useEffect(() => {
        const pSpotify = pendingSpotifyUrl;
        const pGame = pendingGameUrl;
        const needsSpotify = pSpotify !== activeSpotifyUrl;
        const needsGame = pGame !== activeGameUrl;

        if (!needsSpotify && !needsGame) return;

        const myId = ++loadRequestId.current;
        
        const preloadImage = (src: string) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve();
                img.onerror = () => resolve();
            });
        };

        const loadImages = async () => {
            const promises: Promise<void>[] = [];
            if (needsSpotify) promises.push(preloadImage(pSpotify));
            if (needsGame) promises.push(preloadImage(pGame));

            await Promise.all(promises);

            if (myId === loadRequestId.current) {
                if (needsSpotify) setActiveSpotifyUrl(pSpotify);
                if (needsGame) setActiveGameUrl(pGame);
            }
        };

        loadImages();
    }, [pendingSpotifyUrl, pendingGameUrl, activeSpotifyUrl, activeGameUrl]);

    const isSpotifySyncing = pendingSpotifyUrl !== activeSpotifyUrl;
    const isGameSyncing = pendingGameUrl !== activeGameUrl;
    const showSpotifySpinner = isSpotifySyncing;
    const showGameSpinner = isGameSyncing;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 px-2">
                <div className="h-px flex-1 bg-card-border"></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Examples</span>
                <div className="h-px flex-1 bg-card-border"></div>
            </div>
            
            {/* Images Container */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                
                {/* Spotify Example */}
                <div className="w-full max-w-70 flex flex-col space-y-2">
                    <div className="relative w-full">
                        {showSpotifySpinner && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-xl transition-all duration-300">
                                <LoadingSpinner size="lg" dark={true} />
                            </div>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={activeSpotifyUrl} 
                            alt="Spotify Example"
                            onLoad={() => setSpotifyLoaded(true)}
                            className={`w-full h-auto rounded-xl relative z-10 transition-opacity duration-200 ${spotifyLoaded ? 'shadow-custom-card' : ''} ${showSpotifySpinner ? 'opacity-50' : 'opacity-100'}`} 
                        />
                    </div>
                </div>

                {/* Game Example */}
                <div className="w-full max-w-70 flex flex-col space-y-2">
                    <div className="relative w-full">
                        {showGameSpinner && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-xl transition-all duration-300">
                                <LoadingSpinner size="lg" dark={true} />
                            </div>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={activeGameUrl} 
                            alt="Game Example"
                            onLoad={() => setGameLoaded(true)}
                            className={`w-full h-auto rounded-xl relative z-10 transition-opacity duration-200 ${gameLoaded ? 'shadow-custom-card' : ''} ${showGameSpinner ? 'opacity-50' : 'opacity-100'}`} 
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {/* Customize Trigger */}
                <div className="flex justify-center mt-6">
                    <button 
                        onClick={() => setShowCustomization(!showCustomization)}
                        className={`group flex items-center gap-2 px-6 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${showCustomization ? 'bg-btn-active-bg border-btn-active-border text-foreground hover:bg-btn-active-hover-bg' : 'bg-card border-card-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'}`}
                    >
                        <span>{showCustomization ? 'Hide Customize' : 'Customize'}</span>
                        <svg className={`w-3 h-3 transition-transform duration-300 ${showCustomization ? 'rotate-180' : 'opacity-40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
    
                {/* Shared Customization Panel */}
                <div className={`grid transition-all duration-500 ease-in-out ${showCustomization ? 'grid-rows-[1fr] opacity-100 mt-0' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden px-4 pb-10">
                        <CustomizationPanel 
                            {...cardConfig}
                            hiddenIds={hiddenIds}
                            setHiddenIds={setHiddenIds || cardConfig.setHiddenIds}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
