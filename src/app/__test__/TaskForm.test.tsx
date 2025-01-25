import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

describe("TaskForm Component", () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and button correctly", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    expect(screen.getByPlaceholderText("Nueva Tarea ...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Agregar/i })).toBeInTheDocument();
  });

  test("allows typing in the input", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText("Nueva Tarea ...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Mi nueva tarea" } });

    expect(input.value).toBe("Mi nueva tarea");
  });

  test("calls onAddTask with correct parameters on submit", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText("Nueva Tarea ...");
    const button = screen.getByRole("button", { name: /Agregar/i });

    fireEvent.change(input, { target: { value: "Mi nueva tarea" } });
    fireEvent.click(button);

    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    expect(mockOnAddTask).toHaveBeenCalledWith("Mi nueva tarea", false);
  });

  test("clears input after successful submission", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText("Nueva Tarea ...") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Agregar/i });

    fireEvent.change(input, { target: { value: "Mi nueva tarea" } });
    fireEvent.click(button);

    expect(input.value).toBe("");
  });

  test("does not call onAddTask when input is empty", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const button = screen.getByRole("button", { name: /Agregar/i });

    fireEvent.click(button);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});
