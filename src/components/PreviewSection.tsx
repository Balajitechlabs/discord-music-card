import LoadingSpinner from './LoadingSpinner';
import CustomizationPanel from './CustomizationPanel';
import { CardConfig } from '@/hooks/useCardConfig';

interface PreviewSectionProps extends CardConfig {
  cardUrl: string;
  discordId: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showCustomization: boolean;
  setShowCustomization: (show: boolean) => void;
  copied: boolean;
  copyToClipboard: () => void;
}

export default function PreviewSection({
  cardUrl,
  discordId,
  loading,
  setLoading,
  showCustomization,
  setShowCustomization,
  copied,
  copyToClipboard,
  ...customizationProps
}: PreviewSectionProps) {
  return (
    <div className="space-y-2">
      {/* Preview Image */}
      <div className="flex justify-center mb-3">
        <div className="relative transition-all duration-700">
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-xl transition-all duration-300">
              <LoadingSpinner size="lg" dark={true} />
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={cardUrl} 
            alt="Preview" 
            onLoad={() => setLoading(false)}
            className={`max-w-full h-auto rounded-xl relative z-10 transition-opacity duration-200 shadow-custom-preview ${loading ? 'opacity-50' : 'opacity-100'}`} 
          />
        </div>
      </div>

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

      {/* Customization Panel */}
      <div className={`grid transition-all duration-500 ease-in-out ${showCustomization ? 'grid-rows-[1fr] opacity-100 mt-0' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
        <div className="overflow-hidden px-4 pb-10">
          <CustomizationPanel 
            {...customizationProps}
          />
        </div>
      </div>

      {/* Copy Buttons (Markdown & HTML) */}
      <div className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ease-in-out ${showCustomization ? '-mt-5' : '-mt-8'}`}>
        <button
          onClick={copyToClipboard}
          className="px-6 py-3 rounded-full font-bold uppercase tracking-[0.12em] text-[10px] transition-all active:scale-95 flex items-center gap-2 bg-primary text-primary-foreground hover:bg-foreground hover:text-background shadow-lg"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          {copied ? 'Markdown Copied!' : 'Copy Markdown'}
        </button>
        <button
          onClick={() => {
            if (!cardUrl) return;
            const html = `<a href="https://discord.com/users/${discordId}" target="_blank">\n  <img src="${cardUrl}" alt="Live Music Activity" />\n</a>`;
            navigator.clipboard.writeText(html);
            alert('HTML Code Copied to Clipboard!');
          }}
          className="px-6 py-3 rounded-full font-bold uppercase tracking-[0.12em] text-[10px] transition-all active:scale-95 flex items-center gap-2 bg-secondary text-secondary-foreground border border-secondary-border hover:bg-secondary-hover hover:text-foreground shadow-sm"
        >
          Copy HTML
        </button>
      </div>
    </div>
  );
}