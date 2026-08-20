import { LanyardData, Config } from '@/types';
import { 
  DEMO_MUSIC_COVER, 
  DEMO_GAME_LARGE, 
  DEMO_GAME_SMALL, 
  DEMO_AVATAR, 
  DEMO_DECORATION 
} from '@/constants/assets';

export function getDemoAsset(key: string): string | null {
  switch (key) {
    case 'demo_spotify': return DEMO_MUSIC_COVER;
    case 'demo_large': return DEMO_GAME_LARGE;
    case 'demo_small': return DEMO_GAME_SMALL;
    case 'demo_avatar': return DEMO_AVATAR;
    case 'demo_decoration': return DEMO_DECORATION;
    default: return null;
  }
}

export function getDemoData(type: string, config: Config): LanyardData {
  const isSpotify = type === 'spotify';
  
  return {
    discord_user: {
      id: 'demo',
      username: 'adityalf',
      global_name: 'AdityaLF',
      avatar: null,
      avatar_decoration_data: config.showDecoration ? { asset: 'v2_466487955562725387' } : undefined
    },
    discord_status: 'online',
    activities: [{
      type: isSpotify ? 2 : 0,
      name: isSpotify ? 'Spotify' : 'Red Dead Redemption 2',
      details: isSpotify ? 'Notion' : 'In Main Story',
      state: isSpotify ? 'The Rare Occasions' : 'Chapter 2: Horseshoe Overlook',
      application_id: 'demo_app',
      timestamps: {
        start: Date.now() - (isSpotify ? (2 * 60 + 18) * 1000 : (4 * 3600 + 11 * 60 + 7) * 1000), 
        end: isSpotify ? Date.now() + (3 * 60 + 15 - (2 * 60 + 18)) * 1000 : undefined
      },
      assets: {
        large_image: isSpotify ? 'demo_spotify' : 'demo_large',
        small_image: isSpotify ? undefined : 'demo_small'
      }
    }]
  };
}
