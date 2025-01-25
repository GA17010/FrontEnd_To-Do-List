import React from "react";
import { render, fireEvent, screen } from "@testing-library/react"; 
import TaskItem from "../components/TaskItem";
import "@testing-library/jest-dom";

describe("TaskItem Component", () => {
  const mockTask = {
    id: 1,
    name: "Test Task",
    done: false,
  };

  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  beforeEach(() => {
    render(
      <TaskItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );
  });

  it("renders task name correctly", () => {
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("renders checkbox with correct state", () => {
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls onToggleComplete when checkbox is clicked", () => {
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, true); // ID y nuevo estado
  });

  it("renders delete button and handles deletion", () => {
    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("disables delete button when deleting", () => {
    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton); // Simula la acción de eliminación
    expect(deleteButton).toBeDisabled();
  });
});
