import { useEffect, useState } from "react";
import { BrandLogoLight } from "./brand-logo";
import { HeroCanvas } from "./hero-section";
import { TYPEWRITER_WORDS } from "../data/landing-content";
import { Gift } from "lucide-react";

export function SiteFooter() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", "#waitlist");
  };
  return (
    <>
      <div className="border-t border-border">
        <div className="script-comparison bg-[#111614] text-[#f5f2ec]">
          <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
            <HeroCanvas />
            <div className="relative z-10 mx-auto max-w-195 px-6 pb-16 pt-28 flex justify-center flex-col items-center">
              <div className="text-center script-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-[#3dba72]/25 bg-[#3dba72]/10 px-4 py-1.5 text-xs text-[#3dba72]">
                <span className="size-1.5 rounded-full bg-[#3dba72] script-pulse" />
                Now accepting early access
              </div>

              <h2 className="text-center mb-5 script-fade-up font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-[#f5f2ec] [animation-delay:100ms]">
                No one should face
                <br />
                <Typewriter />
                <br />
                <span>alone.</span>
              </h2>

              <div className="flex flex-col gap-4 mt-5">
                <a
                  href="#waitlist"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToWaitlist();
                  }}
                  className="px-5 py-2.5 bg-primary text-primary-foreground text-sm text-center font-medium rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  Join waitlist
                </a>
                <a
                  href="#waitlist"
                  className="px-5 py-2.5 flex justify-between items-center gap-3 text-primary-foreground text-sm font-medium rounded-full hover:bg-amber/90 hover:-translate-y-0.5 transition-all"
                >
                  Support The Project
                  <Gift />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer className="border-t border-[#283330] bg-[#111614] px-6 py-10 text-center">
        <div className="flex justify-center text-xl text-[#f5f2ec]">
          <BrandLogoLight />
        </div>
        <p className="mt-2 font-serif text-base italic text-[#8a9e94]">
          &quot;Know that someone has your back wherever you are.&quot;
        </p>
        <p className="mt-2 text-xs text-[#334340]">
          &copy; 2026 Interpid Digital Solutions Limited / Built for Nigeria
        </p>
      </footer>
    </>
  );
}

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setIndex((current) => (current + 1) % TYPEWRITER_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [deleting, displayed, index]);

  return (
    <span className="italic text-[#3dba72]">
      {displayed}
      <span className="script-caret ml-1 inline-block h-[0.9em] border-r-2 border-[#3dba72]" />
    </span>
  );
}
