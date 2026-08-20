import { useRef } from 'react';
import SimpleToggle from './SimpleToggle';
import ColorInput from './ColorInput';
import { CardConfig } from '@/hooks/useCardConfig';

type CustomizationPanelProps = CardConfig;

export default function CustomizationPanel(props: CustomizationPanelProps) {
  const {
    showProfile, setShowProfile, showDecoration, setShowDecoration,
    showSmallImage, setShowSmallImage, useDisplayName, setUseDisplayName,
    showAdvancedColors, setShowAdvancedColors, resetColors, applyTheme,
    hiddenIds = [], setHiddenIds,
    bgColor, setBgColor, borderColor, setBorderColor,
    titleColor, setTitleColor, nameColor, setNameColor,
    textColor, setTextColor, timeColor, setTimeColor,
    barBgColor, setBarBgColor, barFgColor, setBarFgColor
  } = props;

  const hideActivityInputRef = useRef<HTMLInputElement>(null);

  const colorOptions = [
    { label: "Background", value: bgColor, onChange: setBgColor },
    { label: "Border", value: borderColor, onChange: setBorderColor },
    { label: "Activity", value: titleColor, onChange: setTitleColor },
    ...(showProfile ? [{ label: "Name", value: nameColor, onChange: setNameColor }] : []),
    { label: "Subtext", value: textColor, onChange: setTextColor },
    { label: "Timer", value: timeColor, onChange: setTimeColor },
    { label: "Track", value: barBgColor, onChange: setBarBgColor },
    { label: "Fill", value: barFgColor, onChange: setBarFgColor },
  ];

  const handleAddHiddenId = () => {
    if (!setHiddenIds) return;
    const val = hideActivityInputRef.current?.value.trim();
    if (val && !hiddenIds.includes(val)) {
      setHiddenIds([...hiddenIds, val]);
      if (hideActivityInputRef.current) {
        hideActivityInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-6 rounded-3xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 bg-card border border-card-border shadow-custom-card">
      <div className="flex justify-between items-center px-1">
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Card Customization</span>
        <button 
          onClick={resetColors} 
          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-colors bg-btn-reset-bg text-btn-reset-fg hover:bg-btn-reset-hover hover:text-btn-reset-hover-fg"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SimpleToggle label="Profile" active={showProfile} onClick={() => setShowProfile(!showProfile)} />
        <SimpleToggle label="Small Image" active={showSmallImage} onClick={() => setShowSmallImage(!showSmallImage)} />
        <SimpleToggle label="Display Name" active={useDisplayName} onClick={() => setUseDisplayName(!useDisplayName)} />
        {showProfile && (
          <SimpleToggle label="Decoration" active={showDecoration} onClick={() => setShowDecoration(!showDecoration)} />
        )}
      </div>

      {/* Hide App Section */}
      {setHiddenIds && (
        <div className="space-y-3 px-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Hide Activity</span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input 
                ref={hideActivityInputRef}
                type="text" 
                placeholder="App ID or Name (e.g. Spotify)" 
                className="flex-1 px-4 py-1.5 rounded-xl bg-card border border-card-border text-[11px] placeholder:text-muted-foreground focus:outline-none focus:border-input-border-focus transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddHiddenId();
                  }
                }}
              />
              <button 
                onClick={handleAddHiddenId}
                className="px-3 py-1.5 rounded-xl bg-btn-reset-bg text-btn-reset-fg hover:bg-btn-reset-hover hover:text-btn-reset-hover-fg transition-all flex items-center justify-center border border-card-border"
                title="Add to Hidden"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            {hiddenIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {hiddenIds.map(id => (
                  <button 
                    key={id} 
                    onClick={() => setHiddenIds(hiddenIds.filter(h => h !== id))}
                    className="px-2 py-1 rounded-md bg-muted text-[10px] font-medium flex items-center gap-1.5 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                  >
                    {id}
                    <svg className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Theme Presets */}
      <div className="space-y-3 pt-1">
        <span className="text-[9px] font-bold uppercase tracking-widest px-1 text-muted-foreground">Quick Theme Presets</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button 
            onClick={() => {
              setBgColor('#121212');
              setBorderColor('#1db954');
              setTitleColor('#ffffff');
              setTextColor('#b3b3b3');
              setTimeColor('#1db954');
              setBarBgColor('#282828');
              setBarFgColor('#1db954');
            }}
            className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-emerald-500/30 text-emerald-400 hover:border-emerald-500 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Spotify
          </button>
          <button 
            onClick={() => {
              setBgColor('#1c1c1e');
              setBorderColor('#fc3c44');
              setTitleColor('#ffffff');
              setTextColor('#aeaeb2');
              setTimeColor('#fc3c44');
              setBarBgColor('#2c2c2e');
              setBarFgColor('#fc3c44');
            }}
            className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-red-500/30 text-red-400 hover:border-red-500 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Apple
          </button>
          <button 
            onClick={() => {
              setBgColor('#0d0d15');
              setBorderColor('#00f0ff');
              setTitleColor('#ff007f');
              setTextColor('#00f0ff');
              setTimeColor('#ff007f');
              setBarBgColor('#1a1a2e');
              setBarFgColor('#00f0ff');
            }}
            className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Cyberpunk
          </button>
          <button 
            onClick={() => {
              setBgColor('#0a0a0f');
              setBorderColor('#8b5cf6');
              setTitleColor('#a78bfa');
              setTextColor('#94a3b8');
              setTimeColor('#a78bfa');
              setBarBgColor('#1e1b4b');
              setBarFgColor('#8b5cf6');
            }}
            className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-purple-500/30 text-purple-400 hover:border-purple-500 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Neon
          </button>
        </div>
      </div>

      {/* Mode / Theme Control */}
      <div className="space-y-3 pt-0">
        <span className="text-[9px] font-bold uppercase tracking-widest px-1 text-muted-foreground">Base Mode</span>
        <div className="relative flex items-center p-1 rounded-xl border w-full max-w-35 bg-card border-card-border">
          <div 
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-lg shadow-sm transition-all duration-300 ease-out bg-btn-reset-bg ${bgColor === '#ffffff' ? 'translate-x-full' : 'translate-x-0'}`}
          ></div>
          
          <button 
            onClick={() => applyTheme('dark')}
            className={`relative z-10 flex-1 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${bgColor !== '#ffffff' ? 'text-foreground' : 'text-text-toggle-inactive'}`}
          >
            Dark
          </button>
          <button 
            onClick={() => applyTheme('light')}
            className={`relative z-10 flex-1 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${bgColor === '#ffffff' ? 'text-foreground' : 'text-text-toggle-inactive'}`}
          >
            Light
          </button>
        </div>
      </div>

      <div className="space-y-4 px-1 mt-4">
        
        <div className="flex justify-center pt-0">
          <button 
            onClick={() => setShowAdvancedColors(!showAdvancedColors)} 
            className={`w-full py-3 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all ${showAdvancedColors ? 'bg-secondary border-secondary-border text-foreground hover:bg-secondary-hover' : 'bg-card border-card-border text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            {showAdvancedColors ? 'Simplified View' : 'All Color Settings'}
          </button>
        </div>

        {showAdvancedColors && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
            {colorOptions.map((opt) => (
              <ColorInput key={opt.label} label={opt.label} value={opt.value} onChange={opt.onChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}