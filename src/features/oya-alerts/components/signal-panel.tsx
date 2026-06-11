import { SignalDiagram } from "./signal-diagram";

const SIGNAL_CHIPS = [
  { label: "Signal sent", state: "live" },
  { label: "Contacts notified", state: "live" },
  { label: "Coverage forming", state: "pending" },
  { label: "Response path active", state: "live" },
] as const;

export function SignalPanel() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-foreground/10 bg-secondary/40 grid-paper">
      <div className="flex items-center justify-between px-5 md:px-7 py-3.5 border-b border-foreground/10 bg-background/60 backdrop-blur text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-emergency opacity-70 sos-ripple" />
            <span className="relative inline-flex size-2 rounded-full bg-emergency" />
          </span>
          <span>SOS / Live signal</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <span>Lat 6.5244 N</span>
          <span>Lon 3.3792 E</span>
          <span className="text-foreground/70">T+00:00:04</span>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <SignalDiagram />
        <div className="mt-6 flex flex-wrap gap-2">
          {SIGNAL_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 border border-foreground/10 text-[11px] font-medium tracking-wide text-foreground/80"
            >
              <span
                className={`size-1.5 rounded-full ${
                  chip.state === "live" ? "bg-primary status-blink" : "bg-amber"
                }`}
              />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
