const accountAndWaitlistInfo = [
  "Name.",
  "Email address.",
  "City, state, or preferred launch area.",
  "User type, such as individual, business, estate, responder, manager, or administrator.",
  "Referral or invite information.",
] as const;

const emergencyInfo = [
  "Emergency type.",
  "Location shared during an active SOS, safety check-in, or incident.",
  "Trusted-circle recipients.",
  "Incident timestamps.",
  "Status updates.",
  "Messages, notes, images, audio, or other evidence you choose to provide.",
  "Responder acknowledgements and action logs.",
] as const;

const responderInfo = [
  "Identity details.",
  "Contact details.",
  "Verification status.",
  "Training or certification information.",
  "Affiliated organization, estate, agency, business, or institution.",
  "Availability and operating area.",
  "Conduct, reputation, or incident participation records.",
] as const;

const organizationInfo = [
  "Organization name.",
  "Contact persons.",
  "Business email and phone number.",
  "Coverage area.",
  "Member, resident, staff, or driver onboarding details.",
  "Incident escalation contacts.",
] as const;

const technicalInfo = [
  "IP address.",
  "Browser and device type.",
  "User agent.",
  "App events and diagnostics.",
  "Login and security events.",
  "Cookies or similar technologies.",
] as const;

const useCases = [
  "Manage the waitlist and launch planning.",
  "Create and manage user accounts.",
  "Provide emergency coordination features.",
  "Notify trusted contacts, verified responders, estates, businesses, or approved safety circles.",
  "Verify responder eligibility and safety status.",
  "Prevent abuse, fraud, impersonation, harassment, or unsafe behavior.",
  "Improve reliability, product quality, and safety workflows.",
  "Provide customer support.",
  "Send service messages, safety updates, and launch communications.",
  "Comply with legal, regulatory, audit, safety, and security obligations.",
] as const;

const locationTriggers = [
  "You trigger an SOS.",
  "You start a safety check-in.",
  "You choose to share location with a circle.",
  "Your organization has a clear, consented work-safety mode.",
] as const;

const safetyCircles = [
  "Private trusted contacts.",
  "Estate or community managers.",
  "Business or fleet managers.",
  "Verified responders.",
  "Professional partners.",
  "Oya Alerts administrators.",
] as const;

const legalBases = [
  "Your consent.",
  "Performance of a service you request.",
  "Legitimate safety, security, fraud-prevention, or operational needs.",
  "Compliance with legal obligations.",
  "Protection of vital interests during emergencies where applicable.",
] as const;

const sharingParties = [
  "Trusted contacts selected by the user.",
  "Verified responders who need incident information to assist.",
  "Estate, business, fleet, campus, or agency managers where the user belongs to that organization and has consented or where safety rules require it.",
  "Service providers, such as hosting, analytics, messaging, SMS, email, identity verification, maps, and support tools.",
  "Legal, regulatory, safety, or law-enforcement authorities where required by law or necessary to prevent serious harm.",
  "Professional advisers, such as lawyers, auditors, and insurers.",
] as const;

const retentionRules = [
  "Waitlist data: until launch communication ends or user requests deletion, subject to operational/legal needs.",
  "Account data: while account is active and for a limited period after closure.",
  "Incident data: retained long enough for safety review, audit, disputes, abuse prevention, and legal obligations.",
  "Precise location: minimized and retained only as long as necessary.",
] as const;

const dataRights = [
  "Be informed about processing.",
  "Access your data.",
  "Correct inaccurate data.",
  "Object to certain processing.",
  "Restrict processing.",
  "Request deletion where applicable.",
  "Request portability where applicable.",
  "Withdraw consent where processing is based on consent.",
  "Report concerns to the Nigeria Data Protection Commission or another competent authority.",
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

function Section({
  title,
  children,
  level = 2,
}: {
  title: string;
  children: React.ReactNode;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <section className="mt-8">
      <Heading
        className={
          level === 2
            ? "text-xl font-medium text-foreground"
            : "text-base font-medium text-foreground"
        }
      >
        {title}
      </Heading>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div>
      <h2 className="text-xl font-medium">Oya Alerts Privacy Policy</h2>
      <p className="mt-3 text-xs leading-7 text-muted-foreground">Last updated: 17th June, 2026</p>
      <p className="mt-3 leading-7 text-muted-foreground">
        This Privacy Policy explains how Intrepid Digital Solutions Limited, trading as Oya Alerts
        (&quot;Oya Alerts&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), collects,
        uses, shares, stores, and protects personal information when people use our website,
        waitlist, mobile app, dashboards, responder tools, community safety programs, or related
        services.
      </p>

      <Section title="1. Who We Are">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is a community-powered emergency coordination platform for Nigeria. Our
          services may help users notify trusted contacts, verified responders, estates, businesses,
          community managers, and other approved safety circles during emergencies or safety-related
          events.
        </p>
        <p className="leading-7 text-muted-foreground">Contact:</p>
        <BulletList
          items={[
            "Legal entity: Intrepid Digital Solutions Limited",
            "Email: legal@oyaa.ng",
            "Website: https://oyaa.ng",
          ]}
        />
      </Section>

      <Section title="2. Information We Collect">
        <p className="leading-7 text-muted-foreground">
          We may collect the following categories of information:
        </p>
        <Section title="Account And Waitlist Information" level={3}>
          <BulletList items={accountAndWaitlistInfo} />
        </Section>
        <Section title="Emergency And Safety Information" level={3}>
          <p className="leading-7 text-muted-foreground">
            If you use emergency features, we may collect:
          </p>
          <BulletList items={emergencyInfo} />
        </Section>
        <Section title="Responder And Verification Information" level={3}>
          <p className="leading-7 text-muted-foreground">
            For users who apply to become responders or safety helpers, we may collect:
          </p>
          <BulletList items={responderInfo} />
        </Section>
        <Section title="Business And Organization Information" level={3}>
          <p className="leading-7 text-muted-foreground">
            For estates, agencies, fleets, campuses, institutions, and businesses, we may collect:
          </p>
          <BulletList items={organizationInfo} />
        </Section>
        <Section title="Device, Usage, And Technical Information" level={3}>
          <p className="leading-7 text-muted-foreground">We may collect:</p>
          <BulletList items={technicalInfo} />
        </Section>
      </Section>

      <Section title="3. How We Use Information">
        <p className="leading-7 text-muted-foreground">We use information to:</p>
        <BulletList items={useCases} />
      </Section>

      <Section title="4. Location Data">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is designed around incident-scoped location sharing.
        </p>
        <p className="leading-7 text-muted-foreground">
          We should only collect or share precise location when:
        </p>
        <BulletList items={locationTriggers} />
        <p className="leading-7 text-muted-foreground">
          We do not intend to continuously track users in the background unless a user explicitly
          turns on a feature that requires it and gives clear consent.
        </p>
      </Section>

      <Section title="5. Safety Circles And Visibility">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts may let users choose who can receive alerts and what they can see. Visibility
          may depend on user settings, subscription plan, organization membership, incident type,
          and safety rules.
        </p>
        <p className="leading-7 text-muted-foreground">Possible circles include:</p>
        <BulletList items={safetyCircles} />
        <p className="leading-7 text-muted-foreground">
          We aim to show only the information needed for a person or organization to help safely.
        </p>
      </Section>

      <Section title="6. Legal Basis And Consent">
        <p className="leading-7 text-muted-foreground">
          We process personal data based on one or more lawful grounds, including:
        </p>
        <BulletList items={legalBases} />
        <p className="leading-7 text-muted-foreground">
          Where consent is required, we will ask clearly and provide a way to withdraw consent where
          legally and operationally possible.
        </p>
      </Section>

      <Section title="7. How We Share Information">
        <p className="leading-7 text-muted-foreground">We may share information with:</p>
        <BulletList items={sharingParties} />
        <p className="leading-7 text-muted-foreground">We do not sell personal information.</p>
      </Section>

      <Section title="8. Data Retention">
        <p className="leading-7 text-muted-foreground">
          We keep personal data only for as long as needed for the purposes described in this
          policy, including safety, legal, audit, dispute, fraud-prevention, and operational needs.
        </p>
        <p className="leading-7 text-muted-foreground">
          Suggested retention rules for legal review:
        </p>
        <BulletList items={retentionRules} />
      </Section>

      <Section title="9. Security">
        <p className="leading-7 text-muted-foreground">
          We use reasonable technical and organizational measures to protect information, including
          access controls, server-side secret handling, encryption where appropriate, audit logs,
          and role-based permissions.
        </p>
        <p className="leading-7 text-muted-foreground">
          No digital service is completely secure. Users should keep their account credentials
          private and report suspected misuse quickly.
        </p>
      </Section>

      <Section title="10. Your Rights">
        <p className="leading-7 text-muted-foreground">
          Subject to applicable law, you may have rights to:
        </p>
        <BulletList items={dataRights} />
        <p className="leading-7 text-muted-foreground">
          To exercise these rights, contact{" "}
          <a className="text-blue-600 italic text-sm" href="mailto:legal@oyaa.ng">
            legal@oyaa.ng
          </a>
        </p>
      </Section>

      <Section title="11. Children And Minors">
        <p className="leading-7 text-muted-foreground">
          Oya Alerts is not intended for unsupervised use by children. For schools, campuses, family
          accounts, or minors, we may require parent, guardian, school, or institution consent
          depending on the feature and applicable law.
        </p>
      </Section>

      <Section title="12. International Transfers">
        <p className="leading-7 text-muted-foreground">
          Some service providers may process data outside Nigeria. Where this occurs, we will aim to
          use appropriate safeguards and reputable providers.
        </p>
      </Section>

      <Section title="13. Changes To This Policy">
        <p className="leading-7 text-muted-foreground">
          We may update this Privacy Policy as the product evolves. Material changes will be
          communicated through the website, app, email, or other appropriate channels.
        </p>
      </Section>

      <Section title="14. Contact">
        <p className="leading-7 text-muted-foreground">
          For questions, complaints, or privacy requests, contact
          <a className="text-blue-600 italic text-sm" href="mailto:legal@oyaa.ng">
            {""} legal@oyaa.ng
          </a>
        </p>
      </Section>
    </div>
  );
}
