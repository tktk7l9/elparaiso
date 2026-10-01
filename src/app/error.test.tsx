import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "./error";

describe("error boundary page", () => {
  afterEach(() => vi.restoreAllMocks());

  it("reports the error, offers retry and a way home", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = Object.assign(new Error("boom"), { digest: "abc" });
    const reset = vi.fn();
    render(<ErrorPage error={error} reset={reset} />);

    expect(consoleError).toHaveBeenCalledWith(error);
    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("heading", { level: 1, name: "エラーが発生しました" })).toBeVisible();
    expect(screen.getByRole("link", { name: "ホームへ戻る" })).toHaveAttribute("href", "/");

    await userEvent.click(screen.getByRole("button", { name: "再試行" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
