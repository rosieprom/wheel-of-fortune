import { render, screen, userEvent } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home page", () => {
  it("should render the page", () => {
    render(<Home />);
    screen.debug();
    const title = screen.getByRole("heading", { name: /wheel of fortune/i });
    expect(title).toBeInTheDocument();
  });

  it("should let us add some items, then spin the wheel", async () => {
    render(<Home />);
    const addItemButton = screen.getByRole("button", { name: /Add an item/i });
    await userEvent.click(addItemButton);
    const itemInput = screen.getByLabelText(/item/i);
    expect(itemInput).toBeInTheDocument();
    await userEvent.type(itemInput, "Apple");
    expect(itemInput).toHaveValue("Apple");
    await userEvent.click(addItemButton);
    const items = screen.getAllByLabelText(/item/i);
    expect(items).toHaveLength(2);
    await userEvent.type(items[1], "Orange");
    expect(items[1]).toHaveValue("Orange");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    const spinButton = screen.getByRole("button", { name: /spin/i });
    await userEvent.click(spinButton);
    const prize = await screen.findByText(
      /Congratulations! you won: (?:apple|orange)/i
    );
    expect(prize).toBeInTheDocument();
  });
});
