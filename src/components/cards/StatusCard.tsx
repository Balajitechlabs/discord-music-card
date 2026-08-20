/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { formatTime, formatGameTime, getStatusColor } from '@/utils/format';
import { Config, LanyardData, Activity } from '@/types';

interface StatusCardProps {
    config: Config;
    data: LanyardData;
    activity: Activity | null | undefined;
    images: {
        imageAsBase64: string;
        smallImageAsBase64: string;
        avatarBase64: string;
        decorationBase64: string;
    };
    currentTimestamp: number;
}

interface TimeDetails {
    elapsed: string;
    total: string;
    progress: number;
    remainingSeconds: number;
}

const calculateTimeDetails = (activity: Activity | null | undefined, currentTimestamp: number): { hasTime: boolean; timeDetails: TimeDetails } => {
    const timeDetails: TimeDetails = { elapsed: '', total: '', progress: 0, remainingSeconds: 0 };
    const hasTime = !!activity?.timestamps?.start;

    if (hasTime && activity?.timestamps) {
        const { start, end } = activity.timestamps;
        const now = currentTimestamp;
        const elapsed = now - start;

        if (end) {
            const total = end - start;
            timeDetails.elapsed = formatTime(elapsed);
            timeDetails.total = formatTime(total);
            timeDetails.progress = Math.min((elapsed / total) * 100, 100);
            timeDetails.remainingSeconds = Math.max(Math.round((end - now) / 1000), 1);
        } else {
            timeDetails.elapsed = formatGameTime(elapsed);
            timeDetails.total = 'elapsed';
            const max = 10 * 3600 * 1000;
            timeDetails.progress = Math.min((elapsed / max) * 100, 100);
        }
    }
    return { hasTime, timeDetails };
};

const calculateHeight = (config: Config, activity: Activity | null | undefined, hasTime: boolean, isElapsed: boolean): number => {
    let height = 35;
    if (config.showProfile) {
        height += 70;
    }

    if (activity) {
        height += 80;
        if (hasTime) height += isElapsed ? 12 : 45;
    } else {
        height += 55;
    }
    return Math.max(height, 120);
};

const getStyles = (config: Config, statusColor: string, gameTimerColor: string, discordStatus: string, progress: number, remainingSeconds: number) => `
    * { box-sizing: border-box; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
    
    .card { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif; 
        padding: 18px 20px; 
        display: flex; 
        flex-direction: column; 
        box-sizing: border-box; 
        height: 100%; 
        position: relative; 
    }
    
    /* Fix image rendering artifacts */
    img { 
        image-rendering: -webkit-optimize-contrast; 
        image-rendering: high-quality; 
        transform: translateZ(0); 
        backface-visibility: hidden;
    }

    .profile-header { 
        display: flex; 
        align-items: center; 
        gap: 12px; 
        border-bottom: 1px solid rgba(255, 255, 255, 0.08); 
        padding-bottom: 12px; 
        margin-bottom: 14px; 
        flex-shrink: 0; 
        position: relative;
        z-index: 10;
    }

    .profile-avatar-container { position: relative; width: 44px; height: 44px; }
    
    .profile-avatar { 
        width: 44px; 
        height: 44px; 
        border-radius: 50%; 
        border: 2px solid rgba(255, 255, 255, 0.12); 
        background: #18181b; 
        z-index: 1; 
        position: relative; 
    }
    
    .profile-decoration { 
        position: absolute; 
        top: 55%; 
        left: 55%; 
        width: 120%; 
        height: 120%; 
        transform: translate(-50%, -50%); 
        z-index: 2; 
        pointer-events: none; 
    }
    
    .status-indicator { 
        position: absolute; 
        bottom: -1px; 
        right: -1px; 
        width: 11px; 
        height: 11px; 
        border-radius: 50%; 
        border: 2px solid #09090b; 
        background-color: ${statusColor}; 
        z-index: 3; 
        box-shadow: 0 0 8px ${statusColor};
        animation: pulseStatus 2s infinite ease-in-out;
    }

    @keyframes pulseStatus {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.65; transform: scale(1.15); }
    }
    
    .profile-info { display: flex; flex-direction: column; justify-content: center; height: 44px; margin-top: 0; }
    .profile-name { font-weight: 700; font-size: 1.05rem; color: ${config.name}; display: flex; align-items: center; gap: 6px; }

    .main-content { display: flex; gap: 16px; align-items: center; width: 100%; position: relative; }
    .image-container { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
    .cover-image { 
        width: 80px; 
        height: 80px; 
        border-radius: 12px; 
        object-fit: cover; 
        background: #18181b; 
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .small-image { 
        position: absolute; 
        bottom: -4px; 
        right: -4px; 
        width: 26px; 
        height: 26px; 
        border-radius: 50%; 
        border: 2.5px solid #141414; 
        background: #18181b; 
        z-index: 10; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }

    .activity-details { display: flex; flex-direction: column; gap: 3px; overflow: hidden; width: 100%; justify-content: center; min-height: 80px; }
    .activity-name-row { display: flex; align-items: center; gap: 8px; overflow: hidden; }
    .activity-name { font-weight: 700; font-size: 1.02rem; color: ${config.title}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: -0.01em; }
    .details { font-size: 0.875rem; font-weight: 500; color: ${config.text}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.35; opacity: 0.92; }
    .state { font-size: 0.8rem; font-weight: 400; color: ${config.time}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.35; opacity: 0.8; }
    
    .progress-section { margin-top: 14px; width: 100%; }
    .progress-bar { 
        width: 100%; 
        height: 5px; 
        background-color: rgba(255, 255, 255, 0.12); 
        border-radius: 999px; 
        overflow: hidden; 
        margin-bottom: 6px; 
    }
    .progress-bar-inner { 
        height: 100%; 
        background: linear-gradient(90deg, #22c55e 0%, #4ade80 100%); 
        border-radius: 999px; 
        width: ${progress}%;
        box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        ${remainingSeconds > 0 ? `animation: liveProgress ${remainingSeconds}s linear forwards;` : ''}
    }

    @keyframes liveProgress {
        from { width: ${progress}%; }
        to { width: 100%; }
    }

    .time-info { 
        display: flex; 
        justify-content: space-between; 
        font-size: 0.75rem; 
        color: ${config.time}; 
        font-weight: 500; 
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.02em;
        opacity: 0.85;
    }
    
    .game-timer { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: ${gameTimerColor}; font-weight: 600; margin-top: 4px; }

    /* Animated Music Waveform */
    .equalizer {
        display: flex;
        align-items: flex-end;
        gap: 2.5px;
        height: 14px;
        flex-shrink: 0;
    }
    .eq-bar {
        width: 3px;
        background: #22c55e;
        border-radius: 1.5px;
        transform-origin: bottom;
        animation: eqBounce 1.2s ease-in-out infinite alternate;
        box-shadow: 0 0 4px rgba(34, 197, 94, 0.5);
    }
    .eq-bar:nth-child(1) { height: 65%; animation-delay: 0.1s; animation-duration: 0.85s; }
    .eq-bar:nth-child(2) { height: 100%; animation-delay: 0.3s; animation-duration: 1.15s; }
    .eq-bar:nth-child(3) { height: 45%; animation-delay: 0.5s; animation-duration: 0.95s; }
    .eq-bar:nth-child(4) { height: 85%; animation-delay: 0.2s; animation-duration: 1.25s; }

    @keyframes eqBounce {
        0% { transform: scaleY(0.2); }
        100% { transform: scaleY(1.0); }
    }

    /* Animated Ticking Timer */
    .time-roller {
        height: 14px;
        overflow: hidden;
        display: inline-flex;
    }
    .time-reel {
        display: flex;
        flex-direction: column;
        ${remainingSeconds > 0 ? `animation: tickUp ${remainingSeconds}s steps(${remainingSeconds}, end) forwards;` : ''}
    }
    .time-reel > span {
        height: 14px;
        line-height: 14px;
        font-size: 0.75rem;
        color: ${config.time};
        font-weight: 500;
    }
    @keyframes tickUp {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-${remainingSeconds * 14}px); }
    }
`;

export const StatusCard: FC<StatusCardProps> = ({ config, data, activity, images, currentTimestamp }) => {
    const { imageAsBase64, smallImageAsBase64, avatarBase64, decorationBase64 } = images;
    
    const discordStatus = data.discord_status || 'offline';
    const statusColor = getStatusColor(discordStatus);
    const gameTimerColor = config.time === '#b0b0b0' ? '#4ade80' : config.time;

    const username = data.discord_user.username;
    const displayName = config.nameType === 'username' 
        ? username 
        : (data.discord_user.global_name || username);

    const { hasTime, timeDetails } = calculateTimeDetails(activity, currentTimestamp);

    // Generate live ticking seconds for the timer
    const timeSteps: string[] = [];
    if (hasTime && activity?.timestamps?.end && activity?.timestamps?.start) {
        const { start, end } = activity.timestamps;
        const now = currentTimestamp;
        const startSec = Math.floor((now - start) / 1000);
        const totalSec = Math.floor((end - start) / 1000);
        const maxSteps = Math.min(totalSec - startSec, 360);
        for (let i = 0; i <= maxSteps; i++) {
            timeSteps.push(formatTime((startSec + i) * 1000));
        }
    }

    const height = calculateHeight(config, activity, hasTime, timeDetails.total === 'elapsed');
    const styles = getStyles(config, statusColor, gameTimerColor, discordStatus, timeDetails.progress, timeSteps.length > 1 ? timeSteps.length - 1 : timeDetails.remainingSeconds);

    return (
        <svg width="400" height={height} viewBox={`0 0 400 ${height}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#09090b" />
                </linearGradient>
                <clipPath id="cardClip">
                    <rect x="0.5" y="0.5" width="399" height={height - 1} rx="14" />
                </clipPath>
                <filter id="ambientBlur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="28" />
                </filter>
            </defs>
            <rect x="0.5" y="0.5" width="399" height={height - 1} fill="url(#cardBgGrad)" stroke="#27272a" strokeWidth="1" rx="14" />
            {config.ambient && activity && imageAsBase64 && (
                <g clipPath="url(#cardClip)" opacity="0.28">
                    <image href={imageAsBase64} x="-20" y="-20" width="160" height="160" filter="url(#ambientBlur)" preserveAspectRatio="none" />
                </g>
            )}
            <foreignObject width="100%" height="100%">
                {/* @ts-expect-error: React.HTMLAttributes */}
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <style>{styles}</style>
                    <div className="card">
                        {config.showProfile && (
                            <div className="profile-header">
                                <div className="profile-avatar-container">
                                    <img src={avatarBase64} className="profile-avatar" alt="Avatar" />
                                    {decorationBase64 && <img src={decorationBase64} className="profile-decoration" alt="Decoration" />}
                                    <div className="status-indicator"></div>
                                </div>
                                <div className="profile-info">
                                    <div className="profile-name">
                                        {displayName}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activity ? (
                            <>
                                <div className="main-content">
                                    <div className="image-container">
                                        <img src={imageAsBase64} className="cover-image" alt="Cover" />
                                        {smallImageAsBase64 && <img src={smallImageAsBase64} className="small-image" alt="Small Asset" />}
                                    </div>
                                    <div className="activity-details">
                                        <div className="activity-name-row">
                                            <div className="activity-name">{activity.name}</div>
                                            <div className="equalizer">
                                                <div className="eq-bar"></div>
                                                <div className="eq-bar"></div>
                                                <div className="eq-bar"></div>
                                                <div className="eq-bar"></div>
                                            </div>
                                        </div>
                                        <div className="details">{activity.details || ''}</div>
                                        <div className="state">{activity.state || ''}</div>
                                        {hasTime && timeDetails.total === 'elapsed' && (
                                            <div className="game-timer">
                                                <span>{timeDetails.elapsed} elapsed</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {hasTime && timeDetails.total !== 'elapsed' && (
                                    <div className="progress-section">
                                        <div className="progress-bar">
                                            <div className="progress-bar-inner"></div>
                                        </div>
                                        <div className="time-info">
                                            {timeSteps.length > 1 ? (
                                                <div className="time-roller">
                                                    <div className="time-reel">
                                                        {timeSteps.map((step, idx) => (
                                                            <span key={idx}>{step}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span>{timeDetails.elapsed}</span>
                                            )}
                                            <span>{timeDetails.total}</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="main-content">
                                <div className="image-container">
                                    <img 
                                        src={avatarBase64} 
                                        className="cover-image" 
                                        alt="BTL Music" 
                                    />
                                    <div className="small-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18V5l12-2v13"></path>
                                            <circle cx="6" cy="18" r="3"></circle>
                                            <circle cx="18" cy="16" r="3"></circle>
                                        </svg>
                                    </div>
                                </div>
                                <div className="activity-details">
                                    <div className="activity-name-row">
                                        <div className="activity-name">BTL Music • Live Player</div>
                                    </div>
                                    <div className="details">No Track Playing Right Now</div>
                                    <div className="state">Syncs live when listening to music 🎵</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </foreignObject>
        </svg>
    );
};