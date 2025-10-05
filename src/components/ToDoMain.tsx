import React from 'react';
import { useState, useEffect } from 'react';

import styles from '../todo.module.css';
import AddToDo from './AddToDo';
import { ITask } from '../types';

const sample : ITask[] = [
    { id: 1, name: 'clean kitchen', complete: false},
    { id: 2, name: 'clean bathroom', complete: false}, 
    { id: 3, name: 'clean verandah', complete: false}
];

const ToDoMain = () => {
    const [tasks, setTask] = useState<ITask[]>(sample);
    const addInputRef = React.useRef<HTMLInputElement | null>(null);
    
    const handleDelete = (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const confirmed = window.confirm(`Delete task "${task.name}"?`);
        if (!confirmed) return;

        setTask((prev) => prev.filter((t) => t.id !== id));

        // Focus the add-input using the forwarded ref (if available).
        try {
            addInputRef.current?.focus();
        } catch (e) {
            // ignore focus errors
        }
    };

    return <div className={ styles.main }>
        <div className={ styles.heading}>Tasks List (Todo)</div>
        <div className={ styles.title}>List of tasks for action</div>
        <br/>

    <AddToDo tasks={tasks} setTask={setTask} ref={addInputRef} />
        
        <div className={ styles.todoContainer}>
            {
                tasks.map((t: ITask) => (
                    <div
                        key={t.id.toString()}
                        className={styles.todoItem}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <span>{t.name} {t.complete ? 'Done' : 'To do'}</span>
                        <button
                            onClick={() => handleDelete(t.id)}
                            aria-label={`Delete ${t.name}`}
                            style={{ marginLeft: '1rem', background: 'transparent', border: 'none', color: '#c00', fontWeight: 700, cursor: 'pointer' }}
                        >
                            ×
                        </button>
                    </div>
                ))
            }
        </div>
    </div>
}

export default ToDoMain;
