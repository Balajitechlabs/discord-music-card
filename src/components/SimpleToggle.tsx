export default function SimpleToggle({ label, active, onClick, activeText = 'Enabled', inactiveText = 'Disabled' }: { label: string, active: boolean, onClick: () => void, activeText?: string, inactiveText?: string }) {
    return (
        <button 
            onClick={onClick} 
            className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-200 border ${active ? 'bg-muted border-muted-foreground/30' : 'bg-card border-card-border'} text-foreground hover:border-muted-foreground/60`}
        >
            <div className="flex flex-col items-start leading-tight">
                <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
                <span className="text-[8px] font-bold uppercase opacity-40">{active ? activeText : inactiveText}</span>
            </div>
            <div className={`w-2 h-2 rounded-full transition-all ${active ? 'bg-foreground/80' : 'bg-foreground/20'}`}></div>
        </button>
    );
}