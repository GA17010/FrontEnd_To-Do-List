"use strict";

import React,{ useState} from "react";
import styles from "../styles/taskitem.module.css";

interface Task {
  id: number;
  name: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, done: boolean) => void;
}

export default function TaskItem({ task, onDelete, onToggleComplete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(task.id);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.done);
  }
  
  return (
    <div key={task.id} className={styles.list_item}>
      <div className={styles.list_content}>
      <input
        name={task.id.toString()}
        type="checkbox"
        onChange={handleToggleComplete}
        className={styles.list_checkbox}
        checked={task.done}
      />
        <label id={task.id.toString()} className={styles.list_text}>
          {task.name}
        </label>
      </div>
      <div className={styles.bin}>
        <button className={styles.bin_button} onClick={handleDelete} disabled={isDeleting}>
          <div className={styles.bin_icon}>
            <svg
              className={styles.bin_top}
              viewBox="0 0 39 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                className={styles.bin_top_line}
                y1="5"
                x2="39"
                y2="5"
                strokeWidth="4"
              ></line>
              <line
                x1="12"
                y1="1.5"
                x2="26.0357"
                y2="1.5"
                className={styles.bin_top_line}
                strokeWidth="3"
              ></line>
            </svg>
            <svg
              className={styles.bin_bottom}
              viewBox="0 0 33 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_8_19" fill="white">
                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
              </mask>
              <path
                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                className={styles.bin_bottom_path}
                mask="url(#path-1-inside-1_8_19)"
              ></path>
              <path
                d="M12 6L12 29"
                className={styles.bin_bottom_line}
                strokeWidth="4"
              ></path>
              <path
                d="M21 6V29"
                className={styles.bin_bottom_line}
                strokeWidth="4"
              ></path>
            </svg>
          </div>
          Eliminar
        </button>
      </div>
    </div>
  );
}
