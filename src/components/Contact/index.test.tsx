import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./index";

/** Observe the native submit without letting jsdom try to navigate. */
function watchSubmit() {
  const onSubmit = vi.fn((e: Event) => e.preventDefault());
  const form = document.querySelector("form")!;
  form.addEventListener("submit", onSubmit);
  return onSubmit;
}

describe("Contact", () => {
  it("explains who the form is for and marks required fields", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 1, name: "CONTACT" })).toBeVisible();
    expect(screen.getByText(/Seeding Program/)).toBeVisible();
    expect(screen.getByText("* Required")).toBeVisible();
    expect(screen.getByRole("group", { name: "Name *" })).toBeVisible();
  });

  it("labels every field and posts them to the Google Form entries", () => {
    render(<Contact />);
    const fields: [string, string, string][] = [
      ["First Name", "entry.1648867423", "given-name"],
      ["Last Name", "entry.2110706354", "family-name"],
      ["Mail Address *", "entry.854962110", "email"],
    ];
    for (const [label, name, autocomplete] of fields) {
      const input = screen.getByLabelText(label);
      expect(input).toHaveAttribute("name", name);
      expect(input).toHaveAttribute("autocomplete", autocomplete);
      expect(input).toBeRequired();
    }
    expect(screen.getByLabelText("Subject *")).toHaveAttribute("name", "entry.1485299470");
    expect(screen.getByLabelText("Message *")).toHaveAttribute("name", "entry.421893950");
    expect(screen.getByLabelText("Message *")).toBeRequired();
    const form = document.querySelector("form")!;
    expect(form).toHaveAttribute("method", "POST");
    expect(form.getAttribute("action")).toMatch(/^https:\/\/docs\.google\.com\/forms\/.*\/formResponse$/);
  });

  it("does not submit while required fields are empty", async () => {
    render(<Contact />);
    const onSubmit = watchSubmit();
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText("First Name")).toBeInvalid();
  });

  it("rejects a malformed email address", async () => {
    render(<Contact />);
    const email = screen.getByLabelText("Mail Address *");
    await userEvent.type(email, "not-an-email");
    expect(email).toBeInvalid();
    await userEvent.clear(email);
    await userEvent.type(email, "taro@example.com");
    expect(email).toBeValid();
  });

  it("submits once every field is filled in", async () => {
    render(<Contact />);
    const onSubmit = watchSubmit();
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("First Name"), "Taro");
    await user.type(screen.getByLabelText("Last Name"), "Yamada");
    await user.type(screen.getByLabelText("Mail Address *"), "taro@example.com");
    await user.type(screen.getByLabelText("Subject *"), "Wholesale");
    await user.type(screen.getByLabelText("Message *"), "Hello");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const data = new FormData(document.querySelector("form")!);
    expect(Object.fromEntries(data)).toEqual({
      "entry.1648867423": "Taro",
      "entry.2110706354": "Yamada",
      "entry.854962110": "taro@example.com",
      "entry.1485299470": "Wholesale",
      "entry.421893950": "Hello",
    });
  });
});
