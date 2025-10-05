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

    // Inline editing state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>('');
    
    const handleDelete = (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const confirmed = window.confirm(`Delete task "${task.name}"?`);
        if (!confirmed) return;

        setTask((prev) => prev.filter((t) => t.id !== id));

        // Focus/select the add-input using the forwarded ref (if available) after React updates the DOM.
        setTimeout(() => {
            try {
                addInputRef.current?.focus();
                try { addInputRef.current?.select(); } catch { /* ignore */ }
            } catch (e) {
                // ignore focus errors
            }
        }, 0);
    };

    const startEditing = (task: ITask) => {
        setEditingId(task.id);
        setEditingText(task.name);
    };

    const cancelEditing = (task: ITask) => {
        const confirmed = window.confirm('Cancel editing? Changes will be lost.');
        if (!confirmed) return;
        setEditingId(null);
        setEditingText('');
    };

    const saveEditing = (task: ITask) => {
        if (!editingText.trim()) {
            alert('Please enter a task');
            return;
        }

        const confirmed = window.confirm('Save changes to the task?');
        if (!confirmed) return;

        setTask((prev) => prev.map((t) => (t.id === task.id ? { ...t, name: editingText.trim() } : t)));
        setEditingId(null);
        setEditingText('');
    };

    return <div className={ styles.main }>
        <div className={ styles.heading}>Tasks List (Todo)</div>
        <br/>

    <AddToDo tasks={tasks} setTask={setTask} ref={addInputRef} />
        
        <div className={ styles.todoContainer}>
            {
                tasks.map((t: ITask) => {
                    const isEditing = editingId === t.id;
                    return (
                        <div
                            key={t.id.toString()}
                            className={styles.todoItem}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ flex: 1 }}>
                                {isEditing ? (
                                    <input
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
                                    />
                                ) : (
                                    <span onClick={() => startEditing(t)} style={{ cursor: 'pointer' }}>{t.name} {t.complete ? 'Done' : 'To do'}</span>
                                )}
                            </div>
                            <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.5rem' }}>
                                {isEditing ? (
                                    <>
                                        <button type="button" onClick={() => saveEditing(t)} aria-label="Save" style={{ cursor: 'pointer' }}>💾</button>
                                        <button type="button" onClick={() => cancelEditing(t)} aria-label="Cancel" style={{ cursor: 'pointer' }}>✖</button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleDelete(t.id)}
                                            aria-label={`Delete ${t.name}`}
                                            style={{ background: 'transparent', border: 'none', color: '#c00', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            ×
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    </div>
}

export default ToDoMain;
