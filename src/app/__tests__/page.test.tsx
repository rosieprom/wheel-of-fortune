import { render, screen } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe.skip("Home page", () => {
  it("should render the page", () => {
    render(<Home />);
    const title = screen.getByRole("heading", { name: /wheel of fortune/i });
    expect(title).toBeInTheDocument();
  });
});
