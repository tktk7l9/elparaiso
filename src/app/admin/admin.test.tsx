import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Session } from "@supabase/supabase-js";

type AuthListener = (event: string, session: Session | null) => void;
type AuthProps = {
  providers: string[];
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

  it("themes the sign-in widget with the site's grays so text meets AA contrast", async () => {
    render(<AdminContent />);
    await screen.findByRole("form", { name: "サインイン" });
    const colors = mock.state.authProps?.appearance?.variables?.default?.colors ?? {};
    // ThemeSupa defaults are gray (#808080) text and a green brand button, both under 4.5:1.
    for (const key of ["brand", "inputLabelText", "anchorTextColor", "defaultButtonText"]) {
      expect(colors[key]).toMatch(/^#[0-9a-f]{6}$/);
      expect(colors[key]).not.toBe("#808080");
    }
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
