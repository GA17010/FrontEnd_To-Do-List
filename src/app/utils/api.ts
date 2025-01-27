export interface Task {
  id: number;
  name: string;
  done: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch("https://to-do-list-59r7.onrender.com/api/tasks/");
    return response.json();
  }
  catch (error) {
    console.error("Error fetching tasks", error);
    return [];
  }
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await fetch("https://to-do-list-59r7.onrender.com/api/tasks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: task.name, done: task.done }),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`https://to-do-list-59r7.onrender.com/api/tasks/${id}/`, {
    method: "DELETE",
  });
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`https://to-do-list-59r7.onrender.com/api/tasks/${task.id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: task.name, done: task.done }),
  });
  return response.json();
}
