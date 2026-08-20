import { LanyardData, Config, Activity } from '@/types';
import { getDemoData } from '@/constants/demo';

export async function getLanyardData(id: string, searchParams: URLSearchParams, config: Config): Promise<LanyardData | null> {
    if (id === 'demo') {
        const type = searchParams.get('type') || 'spotify';
        return getDemoData(type, config);
    } else {
        try {
            const lanyardRes = await fetch(`https://api.lanyard.rest/v1/users/${id}`, { cache: 'no-store' });
            if (!lanyardRes.ok) return null;
            const json = await lanyardRes.json();
            return json.data;
        } catch {
             throw new Error('Failed to fetch Lanyard');
        }
    }
}

export function filterActivity(data: LanyardData, config: Config) {
    if (!data || !data.activities) return null;
    
    return data.activities.find((act: Activity) => {
        if (act.type === 4) return false;
        
        const appId = act.application_id || '';
        const appName = act.name.toLowerCase();
        
        const isHidden = config.hiddenIds.some((hidden: string) => 
            hidden.toLowerCase() === appId.toLowerCase() || hidden.toLowerCase() === appName
        );
        
        return !isHidden;
    });
}
