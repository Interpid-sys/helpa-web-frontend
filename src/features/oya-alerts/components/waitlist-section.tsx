"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { LOCATIONS, ROLES } from "../data/waitlist-options";
import { BrandLogoDark } from "./brand-logo";
import { Field, FormInput, FormSelect } from "./form-field";

export function WaitlistSection() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();

    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success("You're on the oyaAlerts waitlist.", {
        description: "We'll be in touch as coverage opens in your area.",
      });
      form.reset();
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  }

  return (
    <section id="waitlist" className="py-28 bg-secondary/50 border-t border-border">
      <div className="max-w-xl mx-auto px-6 reveal">
        <div className="text-center mb-10">
          <div className="mb-8 flex justify-center">
            <BrandLogoDark />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            05 - Launch signal
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-5 leading-tight">
            Help us decide where oyaAlerts launches.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Only your name is required. Anything else you share helps us plan coverage where you
            live.
          </p>
        </div>

        <div className="relative">
          <form
            onSubmit={onSubmit}
            className={`bg-background rounded-2xl shadow-sm border border-border overflow-hidden transition-all duration-500 ${
              submitted
                ? "opacity-0 -translate-y-2 pointer-events-none absolute inset-0"
                : "opacity-100"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-secondary/60 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary status-blink" />
                Waitlist signal / Ready
              </span>
              <span>OYAALERTS / NG</span>
            </div>

            <div className="p-7 space-y-5">
              <Field label="Full name" required>
                <FormInput
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="Your name"
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email" hint="optional">
                  <FormInput
                    name="email"
                    type="email"
                    maxLength={255}
                    placeholder="name@example.com"
                  />
                </Field>
                <Field label="Phone" hint="optional">
                  <FormInput name="phone" type="tel" maxLength={32} placeholder="+234..." />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Role" hint="optional">
                  <FormSelect name="role" options={ROLES} />
                </Field>
                <Field label="City" hint="optional">
                  <FormSelect name="location" options={LOCATIONS} />
                </Field>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-medium text-base hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0 shadow-sm"
              >
                {submitting ? "Sending signal..." : "Join the oyaAlerts waitlist"}
              </button>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed pt-1">
                We'll only use this to contact you about oyaAlerts' rollout in your area.
              </p>
            </div>
          </form>

          {submitted && (
            <div className="bg-background p-10 rounded-2xl shadow-sm border border-border text-center fade-up">
              <div className="mx-auto mb-5 size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="size-3 rounded-full bg-primary node-pulse" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Signal received.</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You're on the waitlist. We'll reach out as oyaAlerts opens coverage in your area.
                Tell a neighbour - density is what brings us to your community sooner.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
