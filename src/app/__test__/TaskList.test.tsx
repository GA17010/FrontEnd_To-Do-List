import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../components/TaskList";

describe("TaskList Component", () => {
  const mockOnDeleteTask = jest.fn();
  const mockOnToggleComplete = jest.fn();

  const mockTasks = [
    { id: 1, name: "Tarea 1", done: false },
    { id: 2, name: "Tarea 2", done: true },
    { id: 3, name: "Tarea 3", done: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all tasks in the list", () => {
    render(
      <TaskList
        listTasks={mockTasks}
        onDeleteTask={mockOnDeleteTask}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    mockTasks.forEach((task) => {
      expect(screen.getByLabelText(task.name)).toBeInTheDocument();
    });
  });

  test("calls onDeleteTask with correct id when delete button is clicked", () => {
    render(
      <TaskList
        listTasks={mockTasks}
        onDeleteTask={mockOnDeleteTask}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const deleteButtons = screen.getAllByRole("button", { name: /Eliminar/i });

    fireEvent.click(deleteButtons[0]); // Simula clic en el botón de eliminar de la primera tarea

    expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTask).toHaveBeenCalledWith(1);
  });

  test("calls onToggleComplete with correct id and state when checkbox is toggled", () => {
    render(
      <TaskList
        listTasks={mockTasks}
        onDeleteTask={mockOnDeleteTask}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]); // Simula clic en el checkbox de la primera tarea

    expect(mockOnToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, true); // Estado cambiado de false a true
  });

  test("renders tasks with correct checked status", () => {
    render(
      <TaskList
        listTasks={mockTasks}
        onDeleteTask={mockOnDeleteTask}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked(); // Primera tarea no completada
    expect(checkboxes[1]).toBeChecked(); // Segunda tarea completada
    expect(checkboxes[2]).not.toBeChecked(); // Tercera tarea no completada
  });
});
