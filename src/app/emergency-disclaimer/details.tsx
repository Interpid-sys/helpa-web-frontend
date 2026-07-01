const coreLimitations = [
  "Oya Alerts is not a government emergency service.",
  "Oya Alerts is not a police force.",
  "Oya Alerts is not an ambulance service or hospital.",
  "Oya Alerts is not a private security company.",
  "Oya Alerts is not a guaranteed rescue provider.",
] as const;

const selectedCircles = [
  "Trusted contacts.",
  "Verified responders.",
  "Estate or security teams.",
  "Business managers.",
  "Oya administrators.",
] as const;

const responderRules = [
  "Responders are not employees, police officers, doctors, or official emergency agents unless separately verified and authorized by their professional role or organization.",
  "Responders must act safely, lawfully, and within their training.",
  "Responders must not confront danger.",
  "Responders must not perform medical procedures beyond their competence.",
  "Responders must not engage in vigilante activity.",
] as const;

const organizationResponsibilities = [
  "Professional security.",
  "Medical services.",
  "Insurance obligations.",
  "Legal obligations.",
  "Statutory duty-of-care responsibilities.",
  "Internal safety policies, personnel, training, consents, and emergency procedures.",
] as const;

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function EmergencyDisclaimer() {
  return (
    <div>
      <h2 className="text-xl font-medium">Oya Alerts Emergency Disclaimer</h2>
      <p className="mt-3 text-xs leading-7 text-muted-foreground">Last updated: 1st July, 2026</p>

      <Section title="Core Disclaimer">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is an emergency coordination and community safety platform.
        </p>
        <BulletList items={coreLimitations} />
        <p className="leading-7 text-muted-foreground">
          Oya Alerts may help you notify trusted contacts, verified responders, estates, businesses,
          community managers, or other safety circles, but we cannot guarantee that help will
          arrive, that any responder will accept an alert, or that any emergency outcome will be
          prevented.
        </p>
        <p className="leading-7 text-muted-foreground">
          Where available and appropriate, you should also contact official emergency services,
          medical services, security services, estate security, trusted contacts, or other qualified
          help.
        </p>
      </Section>

      <Section title="Short In-App Version">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts coordinates help. It does not guarantee rescue. In serious danger, contact
          official emergency services where available and alert trusted people around you.
        </p>
      </Section>

      <Section title="SOS Flow Version">
        <p className="leading-7 text-muted-foreground">
          By sending this SOS, you understand that Oya Alerts will try to notify the circles you
          selected, which may include:
        </p>
        <BulletList items={selectedCircles} />
        <p className="leading-7 text-muted-foreground">
          Delivery and response are not guaranteed. Use official emergency services where available.
        </p>
      </Section>

      <Section title="Responder Version">
        <BulletList items={responderRules} />
      </Section>

      <Section title="Business / Estate / Organization Version">
        <p className="leading-7 text-muted-foreground">
          The Oya Alerts dashboard helps organizations coordinate safety alerts and incident
          visibility. It does not replace:
        </p>
        <BulletList items={organizationResponsibilities} />
        <p className="leading-7 text-muted-foreground">
          Organizations remain responsible for their own safety policies, personnel, training,
          consents, and emergency procedures.
        </p>
      </Section>

      <p className="leading-7 text-muted-foreground">
        Oya Alerts is a coordination platform, not a guaranteed emergency-response service. In
        emergencies, contact official services and trusted local help where available.
      </p>
    </div>
  );
}
