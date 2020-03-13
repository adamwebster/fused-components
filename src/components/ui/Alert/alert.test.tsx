import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Alert } from "./index";

afterEach(cleanup);

describe("Alert Tests", () => {
  test("Renders Alert with text", () => {
    const { getByText } = render(<Alert>This is an alert</Alert>);
    expect(getByText("This is an alert")).toBeInTheDocument();
  });
});
