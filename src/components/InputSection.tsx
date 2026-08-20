interface InputSectionProps {
  discordId: string;
  setDiscordId: (id: string) => void;
}

export default function InputSection({ discordId, setDiscordId }: InputSectionProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black tracking-tight text-center sm:text-left">Discord Activity Card</h1>
      <div className="space-y-2">
        <div className="relative flex items-center p-0.5 rounded-full border transition-all duration-300 touch-manipulation border-input-border bg-input focus-within:border-input-border-focus">
          <input
            type="text"
            placeholder="Enter Discord User ID"
            value={discordId}
            autoComplete="off"
            autoCorrect="off" 
            autoCapitalize="off"
            spellCheck="false"
            onChange={(e) => setDiscordId(e.target.value)}
            className="w-full px-6 py-3 bg-transparent outline-none font-medium text-base relative z-10 select-text appearance-none text-foreground placeholder-input-placeholder"
          />
        </div>
        
        <div className="flex justify-between items-start px-2">
           <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed text-muted-foreground pt-1">
             Join the <a href="https://discord.gg/lanyard" target="_blank" className="underline decoration-1 underline-offset-2 decoration-foreground text-muted-foreground-darker hover:text-foreground transition-all">Lanyard Discord Server</a> to display your activity.
          </p>
        </div>
      </div>
    </div>
  );
}