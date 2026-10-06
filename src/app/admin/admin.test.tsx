import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Session } from "@supabase/supabase-js";

type AuthListener = (event: string, session: Session | null) => void;
type AuthProps = {
  providers: string[];
  view?: string;
  showLinks?: boolean;
  appearance?: { variables?: { default?: { colors?: Record<string, string> } } };
};

const mock = vi.hoisted(() => {
  const state = {
    session: null as Session | null,
    listener: null as AuthListener | null,
    unsubscribe: vi.fn(),
    signOut: vi.fn(async () => ({ error: null })),
    authProps: null as AuthProps | null,
  };
  const client = {
    auth: {
      getSession: vi.fn(async () => ({ data: { session: state.session } })),
      onAuthStateChange: vi.fn((cb: AuthListener) => {
        state.listener = cb;
        return { data: { subscription: { unsubscribe: state.unsubscribe } } };
      }),
      signOut: state.signOut,
    },
  };
  return { state, client };
});

vi.mock("src/libs/supabase", () => ({ client: mock.client }));

// The Supabase Auth UI is a third-party widget; stand in with a labelled form
// so the test asserts what the page shows, not the widget's internals.
vi.mock("@supabase/auth-ui-react", () => ({
  Auth: (props: AuthProps) => {
    mock.state.authProps = props;
    return (
      <form aria-label="サインイン">
        {props.providers.map((p) => (
          <button key={p} type="button">
            Sign in with {p}
          </button>
        ))}
      </form>
    );
  },
}));

import AdminContent from "./AdminContent";
import Admin from "./page";

const WHITE = "#ffffff";

// WCAG 2.x relative-luminance contrast ratio between two #rrggbb colors.
// A missing or non-hex color yields 1 so the assertion fails loudly.
function contrastRatio(a: string, b: string): number {
  const lum = (hex: string) => {
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return null;
    const [r, g, bl] = [0, 2, 4].map((i) => {
      const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const la = lum(a);
  const lb = lum(b);
  if (la === null || lb === null) return 1;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const fakeSession = { user: { id: "u1" } } as unknown as Session;

describe("admin page", () => {
  beforeEach(() => {
    mock.state.session = null;
    mock.state.listener = null;
    vi.clearAllMocks();
  });

  it("shows the sign-in form with GitHub and Google when there is no session", async () => {
    render(<AdminContent />);
    expect(await screen.findByRole("form", { name: "サインイン" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 1, name: "admin" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Sign in with github" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Sign in with google" })).toBeVisible();
    expect(screen.getByRole("link", { name: "EL PARAISO logo" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Sign out" })).toBeNull();
  });

  it("offers sign-in only: no sign-up, password-recovery or magic-link links on the public page", async () => {
    render(<AdminContent />);
    await screen.findByRole("form", { name: "サインイン" });
    expect(mock.state.authProps?.view).toBe("sign_in");
    expect(mock.state.authProps?.showLinks).toBe(false);
  });

  it("shows Sign out once a session exists and signs out on click", async () => {
    mock.state.session = fakeSession;
    render(<AdminContent />);
    const signOut = await screen.findByRole("button", { name: "Sign out" });
    expect(screen.getByRole("heading", { level: 1, name: "admin" })).toBeVisible();
    expect(screen.queryByRole("form")).toBeNull();
    await userEvent.click(signOut);
    expect(mock.state.signOut).toHaveBeenCalledTimes(1);
  });

  it("switches views when the auth state changes, and stops listening on unmount", async () => {
    const { unmount } = render(<AdminContent />);
    await screen.findByRole("form", { name: "サインイン" });
    expect(mock.state.listener).not.toBeNull();

    mock.state.listener!("SIGNED_IN", fakeSession);
    expect(await screen.findByRole("button", { name: "Sign out" })).toBeVisible();

    mock.state.listener!("SIGNED_OUT", null);
    expect(await screen.findByRole("form", { name: "サインイン" })).toBeVisible();

    unmount();
    expect(mock.state.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("themes the sign-in widget so text meets AA and field borders meet 3:1", async () => {
    render(<AdminContent />);
    await screen.findByRole("form", { name: "サインイン" });
    const colors = mock.state.authProps?.appearance?.variables?.default?.colors ?? {};
    const pair = (fg: string, bg: string) => contrastRatio(colors[fg] ?? "", colors[bg] ?? WHITE);
    // Text on the white page (ThemeSupa: gray #808080 labels/links, 3.9:1).
    for (const key of ["inputLabelText", "anchorTextColor", "anchorTextHoverColor", "defaultButtonText"]) {
      expect(pair(key, "none"), key).toBeGreaterThanOrEqual(4.5);
    }
    // White label on the primary button (ThemeSupa: green, 2:1).
    expect(pair("brandButtonText", "brand")).toBeGreaterThanOrEqual(4.5);
    expect(pair("brandButtonText", "brandAccent")).toBeGreaterThanOrEqual(4.5);
    // Success and error messages (ThemeSupa: red #ff6369 on #fff8f8, 2.8:1).
    expect(pair("messageText", "messageBackground")).toBeGreaterThanOrEqual(4.5);
    expect(pair("messageTextDanger", "messageBackgroundDanger")).toBeGreaterThanOrEqual(4.5);
    // Field boundary against the page, and the focus border against the resting one (WCAG 1.4.11).
    expect(pair("inputBorder", "none")).toBeGreaterThanOrEqual(3);
    expect(pair("inputBorderFocus", "inputBorder")).toBeGreaterThanOrEqual(3);
  });

  it("route wraps the content in the main landmark and shows the loading text until the client-only chunk arrives", async () => {
    render(<Admin />);
    expect(screen.getByRole("main")).toBeVisible();
    // next/dynamic with ssr:false renders the loading fallback first.
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("form", { name: "サインイン" })).toBeVisible());
    expect(screen.queryByText("Loading...")).toBeNull();
  });
});
