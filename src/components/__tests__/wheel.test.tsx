import { render, screen, userEvent } from "@/utils/test-utils";
import Wheel from "@/components/wheel";
import "@testing-library/jest-dom";

describe("Wheel", () => {
  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon",
    "Yuzu",
    "Zucchini",
  ];
  const onSpinEnd = jest.fn();

  it("should render a wheel", () => {
    render(<Wheel items={items} onSpinEnd={onSpinEnd} />);
    const wheel = screen.getByTestId("wheel");
    expect(wheel).toBeInTheDocument();
  });

  it("should let us spin the wheel", async () => {
    render(<Wheel items={items} onSpinEnd={onSpinEnd} />);
    const spinButton = screen.getByRole("button", { name: /spin/i });
    await userEvent.click(spinButton);
    expect(onSpinEnd).toHaveBeenCalled();
  });
});
