import React, { useState, useRef, useImperativeHandle } from 'react';
import styles from '../todo.module.css';
import { ITask } from '../types';

type Props = {
  tasks: ITask[];
  setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const AddToDo = React.forwardRef<HTMLInputElement, Props>(({ tasks, setTask }, ref) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Expose the native input methods via the forwarded ref and ensure callers can focus/select
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    select: () => inputRef.current?.select(),
    // also expose the raw element
    get current() {
      return inputRef.current!
    }
  } as unknown as HTMLInputElement), []);

  const onAdd = () => {
    if (!text.trim()) {
      alert('Please enter a task');
      return;
    }

    const maxId = tasks.length ? Math.max(...tasks.map((t) => t.id)) : 0;
    const newTask: ITask = {
      id: maxId + 1,
      name: text.trim(),
      complete: false,
    };

    setTask((prev) => [...prev, newTask]);
    setText('');
  };

  return (
    <div
      className={styles.todoAdd ?? ''}
      style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.5rem 0', position: 'relative', zIndex: 1 }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        disabled={false}
        placeholder="Enter new task"
        tabIndex={0}
        aria-label="New task"
        style={{ flex: 1, padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', position: 'relative', zIndex: 2, pointerEvents: 'auto' }}
      />
      <button type="button" onClick={onAdd} style={{ padding: '0.5rem 1rem' }} aria-label="Add task">Add</button>
    </div>
  );
});

AddToDo.displayName = 'AddToDo';

export default AddToDo;
