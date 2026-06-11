import { useCallback, useEffect, useRef } from "react";
import { SignalPanel } from "./signal-panel";
import ResponseFlow from "./response-flow";

export function HeroSection() {
  const formRef = useRef<HTMLElement | null>(null);

  const scrollToScriptForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  return (
    <header className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-24">
      <HeroCanvas />
      <div className="max-w-4xl mx-auto text-center fade-up">
        <div className="script-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-[#3dba72]/10 px-4 py-1.5 text-xs text-primary">
          <span className="size-1.5 rounded-full bg-primary text-primary script-pulse" />
          Now accepting early access
        </div>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] mb-8 tracking-tight text-balance">
          Emergency help should not depend on who answers first.
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 text-pretty">
          oyaAlerts is a community-powered emergency response network for Nigeria, one signal that
          reaches your trusted circle, nearby responders, and the people closest to where you are.
        </p>

        <div className="script-fade-up mt-10 flex flex-col items-center gap-5 [animation-delay:400ms]">
          <SOSButton onClick={scrollToScriptForm} />
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-primary">
            <span>
              Join <strong className="font-medium text-primary">before launch</strong>
            </span>
            <span className="">/</span>
            <span>Free 1-month access</span>
            <span className="">/</span>
            <span>NIN-verified</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Your signup helps us decide where oyaAlerts launches first.
        </p>
      </div>

      <div className="mt-20 reveal">
        <SignalPanel />
        <div className="mt-10 ">
          <ResponseFlow />
        </div>
      </div>
    </header>
  );
}

type NetworkNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  type: "hub" | "node";
};

function SOSButton({ onClick }: { onClick: () => void }) {
  const formRef = useRef<HTMLElement | null>(null);

  const scrollToScriptForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  return (
    <button
      type="button"
      onClick={scrollToScriptForm}
      className="group relative flex size-30 items-center justify-center rounded-full bg-transparent"
      aria-label="Join script comparison waitlist"
    >
      <span className="script-sos-ring absolute inset-0 rounded-full bg-[#3dba72]/15" />
      <span className="script-sos-ring script-sos-ring-2 absolute inset-0 rounded-full bg-[#3dba72]/15" />
      <span className="script-sos-ring script-sos-ring-3 absolute inset-0 rounded-full bg-[#3dba72]/15" />
      <span className="relative z-10 flex size-18 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:scale-105 group-hover:bg-[#0d5128]">
        <span className="text-sm font-medium leading-none">SOS</span>
        <span className="mt-0.5 whitespace-nowrap text-[0.55rem] opacity-75">Join Waitlist</span>
      </span>
    </button>
  );
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<NetworkNode[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    nodesRef.current = Array.from({ length: 55 }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      type: index < 4 ? "hub" : "node",
    }));

    const alertNodes = new Set([0, 8, 20, 35]);

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.pulse += 0.012;
      });

      nodes.forEach((a, index) => {
        nodes.slice(index + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 130) return;

          const alpha = (1 - distance / 130) * 0.22;
          context.beginPath();
          context.strokeStyle = `rgba(61,186,114,${alpha})`;
          context.lineWidth = 0.6;
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        });
      });

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      nodes.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= 150) return;

        context.beginPath();
        context.strokeStyle = `rgba(61,186,114,${(1 - distance / 150) * 0.5})`;
        context.lineWidth = 0.8;
        context.moveTo(node.x, node.y);
        context.lineTo(mouseX, mouseY);
        context.stroke();
      });

      nodes.forEach((node, index) => {
        const isAlert = alertNodes.has(index);
        const isHub = node.type === "hub";

        if (isAlert) {
          const ring = (Math.sin(node.pulse) + 1) * 0.5;
          context.beginPath();
          context.arc(node.x, node.y, node.r + ring * 14, 0, Math.PI * 2);
          context.strokeStyle = `rgba(61,186,114,${0.15 * ring})`;
          context.lineWidth = 1;
          context.stroke();
        }

        context.beginPath();
        context.arc(node.x, node.y, isHub ? node.r * 2 : node.r, 0, Math.PI * 2);
        context.fillStyle = isHub
          ? "rgba(61,186,114,0.9)"
          : isAlert
            ? "rgba(61,186,114,0.7)"
            : "rgba(61,186,114,0.35)";
        context.fill();
      });

      if (mouseX > 0) {
        context.beginPath();
        context.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        context.fillStyle = "rgba(61,186,114,0.8)";
        context.fill();

        const ring = (Math.sin(time * 0.002) + 1) * 0.5;
        context.beginPath();
        context.arc(mouseX, mouseY, 4 + ring * 18, 0, Math.PI * 2);
        context.strokeStyle = `rgba(61,186,114,${0.2 * ring})`;
        context.lineWidth = 1;
        context.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    canvas.addEventListener("mousemove", onMove);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-90" />;
}
