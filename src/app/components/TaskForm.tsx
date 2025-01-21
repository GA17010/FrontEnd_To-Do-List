"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/taskform.module.css";

interface TaskFormProps {
  onAddTask: (name: string, done: boolean) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddTask(name, false);
    setName("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="task"
        type="text"
        placeholder="Nueva Tarea ..."
        value={name}
        className={styles.form_input}
        onChange={handleChange}
      />
      <button type="submit" className={styles.form_button}>
        Agregar
      </button>
    </form>
  );
}
