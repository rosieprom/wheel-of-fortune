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

  it("should render a wheel", () => {
    render(<Wheel items={items} />);
    const wheel = screen.getByTestId("wheel");
    expect(wheel).toBeInTheDocument();
  });

  it("should let us spin the wheel", async () => {
    render(<Wheel items={items} />);
    const spinButton = screen.getByRole("button", { name: /spin/i });
    await userEvent.click(spinButton);
    await new Promise((r) => setTimeout(r, 3000));
    const prize = screen.getByText(/Congratulations! You won: /);
    expect(prize).toBeInTheDocument();
  });
});
