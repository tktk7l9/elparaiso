import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./index";

describe("About", () => {
  it("tells the brand story: founded in 2021, paradise found within", () => {
    render(<About />);
    expect(screen.getByText(/2021年より発足したコミュニティブランド/)).toBeVisible();
    expect(screen.getByText(/スペイン語で楽園という意味/)).toBeVisible();
  });
});
