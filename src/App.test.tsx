// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("login", () => {
  it("Title to render", () => {
    const sut = render(<App />);
    const titleElement = sut.getAllByText("mapa");

    expect(titleElement.length).toEqual(2);
  });
});