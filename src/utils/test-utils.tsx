import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextUIProvider } from "@nextui-org/react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

export * from "@testing-library/react";
export { customRender as render, userEvent };
