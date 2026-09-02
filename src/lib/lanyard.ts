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
    
    const act = data.activities.find((a: Activity) => {
        if (a.type === 4) return false;
        
        const appId = a.application_id || '';
        const appName = a.name.toLowerCase();
        
        const isHidden = config.hiddenIds.some((hidden: string) => 
            hidden.toLowerCase() === appId.toLowerCase() || hidden.toLowerCase() === appName
        );
        
        return !isHidden;
    });

    if (act) {
        if (act.name && act.name.toLowerCase().includes("archivetune")) {
            act.name = "BTL-Music";
        }
        if (act.details && act.details.toLowerCase().includes("archivetune")) {
            act.details = act.details.replace(/ArchiveTune/gi, "BTL-Music");
        }
    }
    return act;
}
