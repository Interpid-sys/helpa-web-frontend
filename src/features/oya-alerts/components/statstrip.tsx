export const SCRIPT_STATS = [
  { val: "87%", lbl: "Emergency calls go unanswered" },
  { val: "<60s", lbl: "Target SOS dispatch time" },
  { val: "1.2M", lbl: "Preventable deaths yearly" },
  { val: ">0.4", lbl: "Target Ambulances per 100k people" },
] as const;

export default function StatsStrip() {
  return (
    <div className="grid border-y border-[#283330] bg-[#18231F] md:grid-cols-4 py-18">
      {SCRIPT_STATS.map((stat) => (
        <div
          key={stat.val}
          className="border-b border-[#283330] px-4 py-6 text-center md:border-b-0 md:border-r md:last:border-r-0"
        >
          <div className="font-sans text-4xl leading-none text-[#f5f2ec]">{stat.val}</div>
          <div className="mt-2 text-xs leading-relaxed text-[#8a9e94]">{stat.lbl}</div>
        </div>
      ))}
    </div>
  );
}
