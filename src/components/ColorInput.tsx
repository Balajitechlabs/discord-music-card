export default function ColorInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-mono uppercase tracking-tight text-foreground">{value}</span>
        <div className="w-7 h-7 rounded-full overflow-hidden border border-input-border relative shadow-sm">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="absolute -top-4 -left-4 w-[200%] h-[200%] cursor-pointer border-0 p-0" 
          />
        </div>
      </div>
    </div>
  );
}