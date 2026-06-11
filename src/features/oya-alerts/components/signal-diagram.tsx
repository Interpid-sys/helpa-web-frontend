const SIGNAL_NODES = [
  { id: "contacts", label: "Trusted contacts", x: 140, y: 130, side: "left" },
  { id: "responders", label: "Nearby responders", x: 860, y: 130, side: "right" },
  { id: "estate", label: "Estate & security", x: 140, y: 380, side: "left" },
  { id: "operators", label: "Emergency operators", x: 860, y: 380, side: "right" },
  { id: "medics", label: "Medical teams", x: 500, y: 470, side: "bottom" },
] as const;

const SIGNAL_CENTER = { x: 500, y: 230 } as const;

export function SignalDiagram() {
  return (
    <svg
      viewBox="0 0 1000 540"
      className="w-full h-auto"
      role="img"
      aria-label="Operational diagram showing an SOS signal propagating from a person at the center to trusted contacts, nearby responders, estate security, emergency operators, and medical teams."
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.45 0.13 25)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.45 0.13 25)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {SIGNAL_NODES.map((node) => (
        <g key={`p-${node.id}`}>
          <line
            x1={SIGNAL_CENTER.x}
            y1={SIGNAL_CENTER.y}
            x2={node.x}
            y2={node.y}
            stroke="oklch(0.195 0.014 60)"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          <line
            x1={SIGNAL_CENTER.x}
            y1={SIGNAL_CENTER.y}
            x2={node.x}
            y2={node.y}
            stroke="oklch(0.36 0.07 155)"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            className="signal-path"
          />
        </g>
      ))}

      <circle cx={SIGNAL_CENTER.x} cy={SIGNAL_CENTER.y} r="130" fill="url(#centerGlow)" />
      <circle
        cx={SIGNAL_CENTER.x}
        cy={SIGNAL_CENTER.y}
        r="44"
        fill="oklch(0.984 0.008 85)"
        stroke="oklch(0.45 0.13 25)"
        strokeOpacity="0.35"
      />
      <circle
        cx={SIGNAL_CENTER.x}
        cy={SIGNAL_CENTER.y}
        r="16"
        fill="oklch(0.45 0.13 25)"
        className="sos-core"
      />
      <text
        x={SIGNAL_CENTER.x}
        y={SIGNAL_CENTER.y + 74}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="3"
        fill="oklch(0.195 0.014 60)"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        SOS / YOU
      </text>

      {SIGNAL_NODES.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r="11"
            fill="oklch(0.984 0.008 85)"
            stroke="oklch(0.36 0.07 155)"
            strokeOpacity="0.55"
            strokeWidth="1.25"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r="4.5"
            fill="oklch(0.36 0.07 155)"
            className="node-pulse"
          />
          <text
            x={node.side === "right" ? node.x + 20 : node.side === "left" ? node.x - 20 : node.x}
            y={node.side === "bottom" ? node.y + 32 : node.y + 4}
            textAnchor={node.side === "right" ? "start" : node.side === "left" ? "end" : "middle"}
            fontSize="13"
            fill="oklch(0.195 0.014 60)"
            fillOpacity="0.85"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
