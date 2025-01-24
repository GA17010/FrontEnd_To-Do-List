import styles from "../styles/tasklist.module.css";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  name: string;
  done: boolean;
}

export default function TaskList({
  listTasks,
  onDeleteTask,
  onToggleComplete,
}: {
  listTasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleComplete: (id: number, done: boolean) => void;
}) {
  return (
    <>
      <div className={styles.list_container}>
        <div className={styles.list}>
          {listTasks.map((task) => (
            <TaskItem
              key={task.id.toString()}
              task={task}
              onDelete={onDeleteTask}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </div>
    </>
  );
}
