import { useEffect, useState } from "react";

const FLOW_STEPS = [
  { icon: "SOS", label: "Emergency" },
  { icon: "AL", label: "Alert sent" },
  { icon: "RN", label: "Responder notified" },
  { icon: "PD", label: "Partner dispatched" },
  { icon: "FI", label: "Family informed" },
  { icon: "OK", label: "Resolved" },
] as const;

export default function ResponseFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((current) => (current + 1) % FLOW_STEPS.length),
      1200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-start justify-center">
      {FLOW_STEPS.map((step, index) => {
        const lit = index <= active;
        return (
          <div key={step.label} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`flex size-7.5 md:size-8 items-center justify-center rounded-full border text-[0.6rem] transition ${
                  lit
                    ? "border-[#3dba72] bg-[#3dba72]/15 text-[#3dba72]"
                    : "border-transparent bg-transparent text-transparent"
                }`}
              >
                {step.icon}
              </div>
              {index < FLOW_STEPS.length - 1 ? (
                <div className="h-px w-9 md:w-9 bg-transparent">
                  <div
                    className={`h-px bg-[#3dba72] transition-all ${index < active ? "w-full" : "w-0"}`}
                  />
                </div>
              ) : null}
            </div>
            <div
              className={`mt-2 max-w-15 md:max-w-17 text-center text-[0.62rem] leading-snug ${lit ? "text-primary" : "text-transparent"}`}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
