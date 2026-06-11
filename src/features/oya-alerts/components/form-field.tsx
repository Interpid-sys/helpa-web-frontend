import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span>
          {label}
          {required ? <span className="text-primary ml-1">*</span> : null}
        </span>
        {hint ? (
          <span className="text-[10px] font-normal tracking-[0.16em] text-muted-foreground/70">
            {hint}
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

export function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 focus:bg-background transition-all"
    />
  );
}

export function FormSelect({
  name,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  options: readonly string[];
}) {
  return (
    <select
      {...props}
      name={name}
      defaultValue={props.defaultValue ?? options[0]}
      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 focus:bg-background transition-all appearance-none"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
