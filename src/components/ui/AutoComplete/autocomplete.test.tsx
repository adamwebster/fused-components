import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Autocomplete } from "./index";

afterEach(cleanup);

describe("Autocomplete Tests", () => {
  test("Renders Autocomplete with placeholder", () => {
    const { getByPlaceholderText, debug } = render(<Autocomplete items={['Test', 'AnotherItem']} placeholder="Auto complete test" />);
    expect(getByPlaceholderText("Auto complete test")).toBeInTheDocument();
  });
});
