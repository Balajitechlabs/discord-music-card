export default function Footer() {
    return (
        <footer className="pt-6 pb-6 flex flex-col items-center gap-4 text-center text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em]">About</span>
                <p className="text-[10px] font-medium opacity-80 max-w-sm leading-relaxed">
                    Discord Activity Card is a dynamic SVG generator for GitHub READMEs that showcases live Discord activity by fetching data from <a href="https://github.com/phineas/lanyard" target="_blank" className="underline decoration-1 underline-offset-2 text-link-text decoration-link-decoration hover:text-link-hover transition-all">Lanyard</a>.
                </p>
            </div>
        </footer>
    );
}