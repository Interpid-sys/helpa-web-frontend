export function BrandLogoDark({ compact = false }: { compact?: boolean }) {
  return (
    <span>
      <img
        src="/brand/oya-alert/oya-alert-logo-dark.svg"
        alt="oyaAlerts"
        className={`block ${compact ? "h-14" : "h-10"}`}
      />
    </span>
  );
}
export function BrandLogoLight({ compact = false }: { compact?: boolean }) {
  return (
    <span>
      <img
        src="/brand/oya-alert/oya-alert-logo-light.png"
        alt="oyaAlerts"
        className={`block ${compact ? "h-14" : "h-20"}`}
      />
    </span>
  );
}
