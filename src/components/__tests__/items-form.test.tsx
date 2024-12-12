import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemForm from "../items-form";

describe("ItemForm", () => {
  const mockOnItemsChange = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <ItemForm onItemsChange={mockOnItemsChange} onClear={mockOnClear} />
    );

    expect(screen.getByText("Enter an item")).toBeInTheDocument();
    expect(screen.getByText("Add an item")).toBeInTheDocument();
  });

  it('adds an item when "Add an item" button is clicked', async () => {
    render(
      <ItemForm onItemsChange={mockOnItemsChange} onClear={mockOnClear} />
    );

    fireEvent.click(screen.getByText("Add an item"));

    await waitFor(() => {
      expect(screen.getByLabelText("Item")).toBeInTheDocument();
    });
  });

  it("removes an item when delete button is clicked", async () => {
    render(
      <ItemForm onItemsChange={mockOnItemsChange} onClear={mockOnClear} />
    );

    fireEvent.click(screen.getByText("Add an item"));
    await waitFor(() => {
      expect(screen.getByLabelText("Item")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "" })); // Delete button

    await waitFor(() => {
      expect(screen.queryByLabelText("Item")).not.toBeInTheDocument();
    });
  });

  it("calls onClear when Clear button is clicked", async () => {
    render(
      <ItemForm onItemsChange={mockOnItemsChange} onClear={mockOnClear} />
    );

    fireEvent.click(screen.getByText("Add an item"));
    await waitFor(() => {
      expect(screen.getByLabelText("Item")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Clear"));

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("calls onItemsChange when an item is added", async () => {
    render(
      <ItemForm onItemsChange={mockOnItemsChange} onClear={mockOnClear} />
    );

    fireEvent.click(screen.getByText("Add an item"));
    const input = await screen.findByLabelText("Item");
    fireEvent.change(input, { target: { value: "Test Item" } });

    await waitFor(() => {
      expect(mockOnItemsChange).toHaveBeenCalledWith(["Test Item"]);
    });
  });
});
