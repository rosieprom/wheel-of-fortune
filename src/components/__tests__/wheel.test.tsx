import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Wheel from "../wheel";
import { colorMap } from "../../utils/colour-map";

// Mock the canvas methods
const mockContext = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  arc: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  clearRect: jest.fn(),
  fillText: jest.fn(),
};

HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext) as any;

jest.mock("../../utils/colour-map", () => ({
  colorMap: [
    { text: "#000", background: "#90d8b2" },
    { text: "#000", background: "#8dd2dd" },
    { text: "#000", background: "#8babf1" },
  ],
}));

describe("Wheel", () => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the wheel and spin button", async () => {
    render(<Wheel items={items} reset={false} />);

    await expect(screen.getByTestId("wheel")).toBeInTheDocument();
    await expect(screen.getByText("Spin")).toBeInTheDocument();
  });

  it("disables spin button when spinning", async () => {
    render(<Wheel items={items} reset={false} />);
    const spinButton = screen.getByText("Spin");
    await act(async () => {
      fireEvent.click(spinButton);
    });
    await expect(spinButton).toBeDisabled();
  });

  // Needs review
  it.skip("uses predefined colors and loops through them", async () => {
    render(<Wheel items={items} reset={false} />);

    const canvas = screen.getByTestId("wheel") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    await expect(context).not.toBeNull();
    await expect(context).toBeDefined();

    // Canvas methods are called 35 times because there are 35 segments
    await expect(mockContext.beginPath).toHaveBeenCalledTimes(35);
    await expect(mockContext.arc).toHaveBeenCalledTimes(32);
    await expect(mockContext.closePath).toHaveBeenCalledTimes(35);
    await expect(mockContext.fill).toHaveBeenCalledTimes(35);

    // TODO: Fix this test
    // await expect(mockContext.fill).toHaveBeenCalledWith(colorMap[0].background);
    // await expect(mockContext.fill).toHaveBeenCalledWith(colorMap[1].background);
    // await expect(mockContext.fill).toHaveBeenCalledWith(colorMap[2].background);
    // await expect(mockContext.fill).toHaveBeenCalledWith(colorMap[0].background);
  });

  it("resets the wheel when reset prop is true", async () => {
    const { rerender } = render(<Wheel items={items} reset={false} />);
    const spinButton = screen.getByText("Spin");
    await act(async () => {
      fireEvent.click(spinButton);
    });
    rerender(<Wheel items={items} reset={true} />);
    expect(spinButton).not.toBeDisabled();
  });

  it("shows winner modal after spinning", async () => {
    render(<Wheel items={items} reset={false} />);
    const spinButton = screen.getByText("Spin");

    await act(async () => {
      fireEvent.click(spinButton);
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Congratulations!/)).toBeInTheDocument();
  });
});
