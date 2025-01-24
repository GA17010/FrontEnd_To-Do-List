"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Header from "./Header/page";
import TaskForm from "./components/TaskForm";
import { addTask, fetchTasks, deleteTask, updateTask } from "./utils/api";
import { lazy } from "react";
const TaskList = lazy(() => import("./components/TaskList"));

interface Task {
  id: number;
  name: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch tasks on load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Add task
  const handleAddTask = async (name: string, done: boolean) => {
    // If task is empty, return
    if (!name.trim()) return;

    // Create a temporary id for the new task
    const tempId = Date.now();
    const newTask = { id: tempId, name: name, done: done };

    // Update UI with new task
    setTasks((prevTasks) => [...prevTasks, newTask]);

    try {
      const addedTask = await addTask(newTask);
      // Update task with actual id
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === tempId
            ? {
                id: addedTask.id,
                name: addedTask.name,
                done: addedTask.done,
              }
            : task
        )
      );
    } catch (error) {
      console.error("Failed to add task:", error);
      // Remove task from UI
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== tempId));
    }
  };

  // Delete task
  const handleDeleteTask = async (id: number) => {
    // Update UI to reflect task deletion
    const previousTasks = tasks;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Failed to delete task:", error);
      // Revert UI changes
      setTasks(previousTasks);
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (id: number, done: boolean) => {
    // Update UI to reflect task completion
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, done } : task))
    );

    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        await updateTask({ ...taskToUpdate, done });
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      // Revert UI changes
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, done: !done } : task
        )
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Header />
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>Sistema de Tareas</h1>
        <p className={styles.description}>
          Organiza tus tareas de forma sencilla y rápida.
        </p>

        <TaskForm onAddTask={handleAddTask} />

        <span className={styles.list_title}>Tareas:</span>

        {loading && <div className={styles.spinner}>Cargando tareas...</div>}

        <TaskList
          listTasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>
      <footer className={styles.footer}>
        <span>
          Creado por{" "}
          <a
            href="https://devgustavo17.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            @devgustavo
          </a>
        </span>
      </footer>
    </div>
  );
}
