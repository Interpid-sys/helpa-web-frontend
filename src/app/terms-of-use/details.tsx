const accountRules = [
  "Provide accurate information.",
  "Keep your login details secure.",
  "Not impersonate any person or organization.",
  "Keep your emergency contacts and profile information updated.",
  "Notify us of unauthorized account use.",
] as const;

const prohibitedEmergencyUse = [
  "Send false or prank alerts.",
  "Harass or endanger responders or other users.",
  "Use the service for mob action, retaliation, vigilantism, political activity, religious targeting, ethnic targeting, or unlawful conduct.",
  "Submit false evidence or misleading incident reports.",
  "Interfere with emergency responders or official services.",
] as const;

const responseLimitations = [
  "That help will arrive.",
  "That any responder will accept or complete a response.",
  "That any message will be delivered instantly.",
  "That any emergency outcome will be prevented.",
  "That any government, medical, security, or third-party service will act.",
] as const;

const organizationRules = [
  "Use dashboards only for legitimate safety purposes.",
  "Obtain necessary consents from members, residents, staff, drivers, students, or users.",
  "Restrict access to authorized personnel.",
  "Avoid using Oya Alerts for surveillance, harassment, discrimination, or unrelated monitoring.",
  "Report abuse or data concerns promptly.",
] as const;

const acceptableUseRules = [
  "Break the law.",
  "Violate privacy rights.",
  "Share another person's personal data without authorization.",
  "Upload malicious code.",
  "Attempt unauthorized access.",
  "Reverse engineer the service.",
  "Use the service to discriminate or target people based on ethnicity, religion, gender, politics, disability, nationality, or other protected characteristics.",
  "Spread panic, misinformation, or harmful content.",
] as const;

const contactDetails = ["Email:"] as const;

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

export default function TermsOfUse() {
  return (
    <div>
      <h2 className="text-xl font-medium">Oya Alerts Terms Of Use</h2>
      <p className="mt-3 text-xs leading-7 text-muted-foreground">Last updated: 27th June, 2026</p>
      <p className="mt-3 leading-7 text-muted-foreground">
        These Terms of Use govern access to and use of Oya Alerts services, including our website,
        waitlist, mobile app, dashboards, responder tools, safety programs, and related services.
      </p>

      <Section title="1. Acceptance">
        <p className="leading-7 text-muted-foreground">
          By using Oya Alerts, you agree to these Terms. If you do not agree, do not use the
          service.
        </p>
      </Section>

      <Section title="2. About Oya Alerts">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is a community-powered safety and emergency coordination platform. We help
          users organize trusted contacts, safety circles, verified responders, estates, businesses,
          agencies, and other approved participants around safety alerts and emergency coordination.
        </p>
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is not a government emergency service, police force, ambulance service,
          hospital, security agency, or guaranteed rescue provider.
        </p>
      </Section>

      <Section title="3. Eligibility">
        <p className="leading-7 text-muted-foreground">
          You must be able to enter into a binding agreement under applicable law. If you use Oya
          Alerts for an organization, estate, agency, business, fleet, school, or institution, you
          confirm that you are authorized to do so.
        </p>
      </Section>

      <Section title="4. User Accounts">
        <p className="leading-7 text-muted-foreground">You agree to:</p>
        <BulletList items={accountRules} />
        <p className="leading-7 text-muted-foreground">
          We may suspend or restrict accounts that violate these Terms or create safety, legal,
          security, or abuse risks.
        </p>
      </Section>

      <Section title="5. Emergency Use">
        <p className="leading-7 text-muted-foreground">
          You agree to use emergency features only for genuine safety, distress, or
          emergency-related situations.
        </p>
        <p className="leading-7 text-muted-foreground">You must not:</p>
        <BulletList items={prohibitedEmergencyUse} />
      </Section>

      <Section title="6. No Guaranteed Response">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is a coordination layer. We may help notify trusted contacts, verified
          responders, organizations, or other safety circles, but we do not guarantee:
        </p>
        <BulletList items={responseLimitations} />
        <p className="leading-7 text-muted-foreground">
          Users should contact official emergency services where available and appropriate.
        </p>
      </Section>

      <Section title="7. Safety Circles And Sharing">
        <p className="leading-7 text-muted-foreground">
          You may be able to create or join safety circles, including private, family, estate,
          business, community, or responder circles. You are responsible for choosing appropriate
          circles and understanding what information may be shared during alerts.
        </p>
        <p className="leading-7 text-muted-foreground">
          Some features may allow organizations, managers, or administrators to receive incident
          information. These features should only be used with proper notice, consent, and
          authority.
        </p>
      </Section>

      <Section title="8. Responders">
        <p className="leading-7 text-muted-foreground">
          Users who apply to become responders or helpers may be subject to verification, training,
          rules, review, and ongoing conduct standards. Approval is not guaranteed.
        </p>
        <p className="leading-7 text-muted-foreground">
          Responder status may be suspended or revoked for safety, legal, operational, abuse, fraud,
          or trust reasons.
        </p>
      </Section>

      <Section title="9. Organizations And Business Dashboards">
        <p className="leading-7 text-muted-foreground">
          Businesses, estates, agencies, fleets, campuses, institutions, and managers must:
        </p>
        <BulletList items={organizationRules} />
      </Section>

      <Section title="10. Subscriptions And Payments">
        <p className="leading-7 text-muted-foreground">
          Some features may be free, paid, sponsored, or included in organization plans. Pricing,
          plan limits, renewal, refund, and cancellation terms will be displayed where applicable.
        </p>
        <p className="leading-7 text-muted-foreground">
          Basic emergency capability should not be represented as a substitute for official
          emergency services.
        </p>
      </Section>

      <Section title="11. Acceptable Use">
        <p className="leading-7 text-muted-foreground">You must not:</p>
        <BulletList items={acceptableUseRules} />
      </Section>

      <Section title="12. Content And Incident Information">
        <p className="leading-7 text-muted-foreground">
          You retain rights to content you submit, but you grant Oya Alerts a limited license to use
          it to operate, secure, investigate, improve, and provide the service.
        </p>
        <p className="leading-7 text-muted-foreground">
          We may remove or restrict content that is unlawful, unsafe, abusive, misleading, or
          inconsistent with these Terms.
        </p>
      </Section>

      <Section title="13. Privacy">
        <p className="leading-7 text-muted-foreground">
          Our Privacy Policy explains how we collect, use, share, and protect personal information.
          By using Oya Alerts, you acknowledge our Privacy Policy.
        </p>
      </Section>

      <Section title="14. Disclaimers">
        <p className="leading-7 text-muted-foreground">
          The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the
          extent permitted by law, we disclaim warranties that the service will be uninterrupted,
          error-free, perfectly secure, or suitable for every emergency.
        </p>
      </Section>

      <Section title="15. Limitation Of Liability">
        <p className="leading-7 text-muted-foreground">
          To the extent permitted by law, Oya Alerts and its officers, employees, contractors,
          partners, and affiliates will not be liable for indirect, incidental, consequential,
          punitive, or special damages arising from use of the service.
        </p>
        <p className="leading-7 text-muted-foreground">
          Nothing in these Terms excludes liability that cannot legally be excluded.
        </p>
      </Section>

      <Section title="16. Indemnity">
        <p className="leading-7 text-muted-foreground">
          You agree to indemnify Oya Alerts against claims, losses, damages, liabilities, and costs
          arising from your misuse of the service, violation of these Terms, unlawful conduct, or
          violation of another person&apos;s rights.
        </p>
      </Section>

      <Section title="17. Suspension And Termination">
        <p className="leading-7 text-muted-foreground">
          We may suspend, restrict, or terminate access where needed to protect users, responders,
          organizations, the platform, or the public.
        </p>
      </Section>

      <Section title="18. Changes">
        <p className="leading-7 text-muted-foreground">
          We may update these Terms. Material changes will be communicated through the website, app,
          email, or another appropriate channel.
        </p>
      </Section>

      <Section title="19. Governing Law">
        <p className="leading-7 text-muted-foreground">
          These Terms are governed by the laws of the Federal Republic of Nigeria, unless another
          jurisdiction is required by applicable law.
        </p>
      </Section>

      <Section title="20. Contact">
        {contactDetails}{" "}
        <a className="text-blue-600 italic text-sm" href="mailto:legal@oyaa.ng">
          legal@oyaa.ng
        </a>
      </Section>
    </div>
  );
}
