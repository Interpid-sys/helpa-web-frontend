import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const VALID_ROLES = new Set(["individual", "community", "responder", "business"]);
const VALID_STATES = new Set(["abuja", "ib", "kano", "lagos", "ph", "other", "prefer-not-to-say"]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,32}$/;

type WaitlistPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  role?: unknown;
  state?: unknown;
  invitedByWaitlistNumber?: unknown;
};

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

function positiveIntegerValue(value: unknown) {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!/^[1-9]\d*$/.test(trimmed)) return null;

  return Number(trimmed);
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { ok: false, message: "Waitlist submissions are not configured yet." },
      { status: 500 },
    );
  }

  let payload: WaitlistPayload;

  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return badRequest("Send valid waitlist details.");
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email).toLowerCase();
  const phone = stringValue(payload.phone);
  const role = stringValue(payload.role);
  const state = stringValue(payload.state);
  const invitedByWaitlistNumber =
    payload.invitedByWaitlistNumber === undefined || payload.invitedByWaitlistNumber === null
      ? null
      : positiveIntegerValue(payload.invitedByWaitlistNumber);

  if (!name || name.length > 120) return badRequest("Enter your name.");
  if (!email || email.length > 255 || !EMAIL_PATTERN.test(email)) {
    return badRequest("Enter a valid email address.");
  }
  if (!phone || phone.length > 32 || !PHONE_PATTERN.test(phone)) {
    return badRequest("Enter a valid phone number.");
  }
  if (!VALID_ROLES.has(role)) return badRequest("Choose how you want to use Helpa.");
  if (!VALID_STATES.has(state)) return badRequest("Choose your state.");
  if (
    payload.invitedByWaitlistNumber !== undefined &&
    payload.invitedByWaitlistNumber !== null &&
    !invitedByWaitlistNumber
  ) {
    return badRequest("Use a valid invite link.");
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.rpc("submit_waitlist_submission", {
    p_name: name,
    p_email: email,
    p_phone: phone,
    p_role: role,
    p_state: state,
    p_invited_by_waitlist_number: invitedByWaitlistNumber,
    p_user_agent: request.headers.get("user-agent"),
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, message: "You're already on the waitlist." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "We could not submit your waitlist details right now." },
      { status: 500 },
    );
  }

  const waitlistNumber = typeof data === "number" ? data : Number(data);

  if (!Number.isInteger(waitlistNumber) || waitlistNumber < 1) {
    return NextResponse.json(
      { ok: false, message: "We could not confirm your waitlist number right now." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    waitlistNumber,
  });
}
