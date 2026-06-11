import type { ChangeEvent, InputHTMLAttributes, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const TRUST_ITEMS = ["NIN-verified network", "End-to-end encrypted", "Free for 4 Weeks"] as const;
export const SCRIPT_ROLES = [
  { key: "A", value: "individual", label: "Protect myself & family" },
  { key: "B", value: "community", label: "Manage an estate or community" },
  { key: "C", value: "responder", label: "Volunteer as a community responder" },
  { key: "D", value: "business", label: "Business or fleet operator" },
] as const;

export const SCRIPT_STATES = [
  { key: "B", value: "abuja", label: "Abuja (FCT)" },
  { key: "D", value: "ib", label: "Ibadan" },
  { key: "G", value: "kano", label: "Kano" },
  { key: "A", value: "lagos", label: "Lagos" },
  { key: "C", value: "ph", label: "Port Harcourt" },
  { key: "E", value: "other", label: "Other" },
  { key: "F", value: "prefer-not-to-say", label: "Prefer not to say" },
] as const;

type ScriptOption = (typeof SCRIPT_ROLES)[number] | (typeof SCRIPT_STATES)[number];
type FieldName = "name" | "email" | "role" | "state" | "phone";
type ValidationErrors = Partial<Record<FieldName, string>>;
type WaitlistResponse = { ok: true; waitlistNumber: number } | { ok: false; message?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,32}$/;

function validateName(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "Enter your name to continue.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";

  return "";
}

function validateEmail(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "Enter your email address.";
  if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";

  return "";
}

function validateRequiredOption(value: string, message: string) {
  return value ? "" : message;
}

function validatePhone(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "Enter your phone number.";
  if (!PHONE_PATTERN.test(trimmed)) return "Enter a valid phone number.";

  return "";
}

export default function ScriptFormSection({ refEl }: { refEl: RefObject<HTMLElement | null> }) {
  return (
    <section id="waitlist" ref={refEl} className="bg-[#111614] px-6 py-24 scroll-mt-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <div className="mb-3 text-xs font-medium uppercase tracking-widest text-[#3dba72]">
            05 - Join the waitlist/Launch signal
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-[#f5f2ec]">
            Because emergencies do not wait
            <em className="text-[#3dba72]"> and neither should help.</em>
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#8a9e94]">
            Be among the first to experience a new standard of personal and community safety. Get
            early access, exclusive launch benefits, and priority membership opportunities.
          </p>
          <div className="mt-8 space-y-3">
            {TRUST_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[#8a9e94]">
                <span className="text-[#3dba72]">&#10003;</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <ScriptWaitlistForm />
      </div>
    </section>
  );
}

function ScriptWaitlistForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const autoSelect = (setter: (value: string) => void, value: string, nextStep: number) => {
    setter(value);
    setErrors((current) => ({ ...current, role: "", state: "" }));
    setTimeout(() => setStep(nextStep), 280);
  };

  const setFieldError = (field: FieldName, message: string) => {
    setErrors((current) => ({ ...current, [field]: message }));
  };

  const clearFieldError = (field: FieldName) => {
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateStep = (field: FieldName) => {
    const validators: Record<FieldName, () => string> = {
      name: () => validateName(name),
      email: () => validateEmail(email),
      role: () => validateRequiredOption(role, "Choose how you want to use Helpa."),
      state: () => validateRequiredOption(state, "Choose your state."),
      phone: () => validatePhone(phone),
    };
    const message = validators[field]();

    setFieldError(field, message);
    return !message;
  };

  const validateAllFields = () => {
    const nextErrors: ValidationErrors = {
      name: validateName(name),
      email: validateEmail(email),
      role: validateRequiredOption(role, "Choose how you want to use Helpa."),
      state: validateRequiredOption(state, "Choose your state."),
      phone: validatePhone(phone),
    };
    const firstInvalidField = (Object.keys(nextErrors) as FieldName[]).find(
      (field) => nextErrors[field],
    );

    setErrors(nextErrors);

    if (firstInvalidField) {
      const stepByField: Record<FieldName, number> = {
        name: 1,
        email: 2,
        role: 3,
        state: 4,
        phone: 5,
      };

      setStep(stepByField[firstInvalidField]);
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validateAllFields()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          state,
          phone,
        }),
      });
      const result = (await response.json().catch(() => null)) as WaitlistResponse | null;

      if (!result) {
        toast.error("We could not submit your details. Please try again.");
        return;
      }

      if (!result.ok) {
        toast.error(result.message ?? "We could not submit your details. Please try again.");
        return;
      }

      if (!response.ok) {
        toast.error("We could not submit your details. Please try again.");
        return;
      }

      setPosition(result.waitlistNumber);
      setDone(true);
      toast.success("You're on the oyaAlerts waitlist.");
    } catch {
      toast.error("We could not submit your details. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {!done ? <ProgressBar step={step} total={5} /> : null}
      <div key={done ? "done" : step} className="script-step-card">
        {done ? (
          <Success position={position} name={name} />
        ) : step === 1 ? (
          <TextStep
            stepNum={1}
            question="What's your name?"
            hint="Just your first name is fine."
            inputProps={{
              type: "text",
              placeholder: "Your first name",
              value: name,
              required: true,
              minLength: 2,
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
                clearFieldError("name");
              },
            }}
            error={errors.name}
            onNext={() => validateStep("name") && setStep(2)}
          />
        ) : step === 2 ? (
          <TextStep
            stepNum={2}
            question={`Nice to meet you, ${name}. What's your email?`}
            hint="We'll send your early access link here."
            inputProps={{
              type: "email",
              placeholder: "you@example.com",
              value: email,
              required: true,
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
                clearFieldError("email");
              },
            }}
            error={errors.email}
            onNext={() => validateStep("email") && setStep(3)}
          />
        ) : step === 3 ? (
          <OptionsStep
            stepNum={3}
            question="How do you want to use Helpa?"
            hint="This helps us tailor your experience."
            options={SCRIPT_ROLES}
            selected={role}
            onSelect={(value) => autoSelect(setRole, value, 4)}
            error={errors.role}
          />
        ) : step === 4 ? (
          <OptionsStep
            stepNum={4}
            question="Which state are you based in?"
            hint="We're launching city by city."
            options={SCRIPT_STATES}
            selected={state}
            onSelect={(value) => autoSelect(setState, value, 5)}
            error={errors.state}
          />
        ) : (
          <TextStep
            stepNum={5}
            question="Last one - your phone number."
            hint="For SMS early access invite. We'll never spam you."
            inputProps={{
              type: "tel",
              placeholder: "+234 800 000 0000",
              value: phone,
              required: true,
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setPhone(event.target.value);
                clearFieldError("phone");
              },
            }}
            error={errors.phone}
            onNext={submit}
            nextLabel={submitting ? "Joining..." : "Join waitlist"}
            disabled={submitting}
          />
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="h-0.5 overflow-hidden rounded-full bg-[#283330]">
        <div
          className="h-full rounded-full bg-[#3dba72] transition-all"
          style={{ width: `${Math.round((step / total) * 100)}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-[#8a9e94]">
        Step {step} of {total}
      </div>
    </div>
  );
}

function TextStep({
  stepNum,
  question,
  hint,
  inputProps,
  error,
  nextLabel = "Continue",
  disabled = false,
  onNext,
  onSkip,
}: {
  stepNum: number;
  question: string;
  hint?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  nextLabel?: string;
  disabled?: boolean;
  onNext?: () => void;
  onSkip?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-widest text-[#8a9e94]">
        Step {stepNum} of 5
      </div>
      <div className="font-serif text-[clamp(1.4rem,3.5vw,1.9rem)] leading-tight text-[#f5f2ec]">
        {question}
      </div>
      {hint ? <div className="mt-2 text-sm leading-6 text-[#8a9e94]">{hint}</div> : null}
      <input
        ref={inputRef}
        {...inputProps}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `waitlist-step-${stepNum}-error` : undefined}
        className={`mt-7 w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-[#f5f2ec] outline-none transition placeholder:text-[#8a9e94] ${
          error
            ? "border-[#e87070] focus:border-[#e87070]"
            : "border-[#283330] focus:border-[#3dba72]"
        }`}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === "Enter") {
            event.preventDefault();
            onNext?.();
          }
          inputProps.onKeyDown?.(event);
        }}
      />
      {error ? (
        <p id={`waitlist-step-${stepNum}-error`} className="mt-3 text-sm text-[#e87070]">
          {error}
        </p>
      ) : null}
      <div className="mt-2 flex flex-col items-start gap-2">
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            disabled={disabled}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#3dba72] px-5 py-3 text-sm font-medium text-[#0d2818] transition hover:-translate-y-0.5 hover:bg-[#4ecf82] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-[#3dba72]"
          >
            {nextLabel} <ArrowIcon />
          </button>
        ) : null}
        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-[#8a9e94] underline decoration-transparent transition hover:text-[#f5f2ec] hover:decoration-[#8a9e94]"
          >
            Skip
          </button>
        ) : null}
      </div>
    </div>
  );
}
function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

function OptionsStep({
  stepNum,
  question,
  hint,
  options,
  selected,
  onSelect,
  error,
}: {
  stepNum: number;
  question: string;
  hint?: string;
  options: readonly ScriptOption[];
  selected: string;
  onSelect: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-widest text-[#8a9e94]">
        Step {stepNum} of 5
      </div>
      <div className="font-serif text-[clamp(1.4rem,3.5vw,1.9rem)] leading-tight text-[#f5f2ec]">
        {question}
      </div>
      {hint ? <div className="mt-2 text-sm leading-6 text-[#8a9e94]">{hint}</div> : null}
      <div
        className="mt-7 flex flex-col gap-3"
        role="radiogroup"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `waitlist-step-${stepNum}-error` : undefined}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onSelect(option.value)}
              role="radio"
              aria-checked={isSelected}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? "border-[#3dba72] bg-[#3dba72]/10 text-[#f5f2ec]"
                  : "border-[#283330] bg-transparent text-[#8a9e94] hover:border-[#3dba72] hover:bg-[#3dba72]/5 hover:text-[#f5f2ec]"
              }`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-md border text-[0.68rem] font-medium ${
                  isSelected
                    ? "border-[#3dba72] bg-[#3dba72] text-[#0d2818]"
                    : "border-[#283330] text-[#8a9e94]"
                }`}
              >
                {option.key}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p id={`waitlist-step-${stepNum}-error`} className="mt-3 text-sm text-[#e87070]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Success({ position, name }: { position: number; name: string }) {
  const share = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "Helpa",
          text: "I joined the Helpa waitlist. Safety for Nigeria.",
          url: "https://oyaa.ng",
        })
        .catch(() => undefined);
      return;
    }

    navigator.clipboard?.writeText("https://oyaa.ng");
  };

  return (
    <div className="py-8 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-[#3dba72]/30 bg-[#3dba72]/10 text-2xl text-[#3dba72]">
        &#10003;
      </div>
      <div className="mb-5 inline-block rounded-full border border-[#3dba72]/25 bg-[#3dba72]/10 px-4 py-2 text-sm text-[#3dba72]">
        #{position} on the waitlist
      </div>
      <h3 className="font-serif text-3xl text-[#f5f2ec]">
        You&apos;re in{name ? `, ${name}` : ""}.
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#8a9e94]">
        We&apos;ll reach out when oyaAlerts launches in your area. Emergencies do not wait, and
        neither should help.
      </p>
      <button
        type="button"
        onClick={share}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#3dba72] px-5 py-3 text-sm font-medium text-[#0d2818] transition hover:-translate-y-0.5 hover:bg-[#4ecf82]"
      >
        Oyaa Share <ArrowIcon />
      </button>
    </div>
  );
}
