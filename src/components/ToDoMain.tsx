import React from 'react';
import { useState, useEffect } from 'react';

import styles from '../todo.module.css';

interface ITask {
    id : number,
    name: string,
    complete: boolean
};

const sample : ITask[] = [
    { id: 1, name: 'clean kitchen', complete: false},
    { id: 1, name: 'clean bathroom', complete: false}, 
    { id: 1, name: 'clean verandah', complete: false}
];

const ToDoMain = () => {
    const [tasks, setTask] = useState<ITask>(sample);

    // Sample items
    /*useEffect(() => {
        setTask(sample);
    },[true]);*/

    return <div>
        <h1 className={ styles.heading}>Tasks List (Todo)</h1>
        <h1 className={ styles.title}>List of tasks for action</h1>
        <br/>
        <div className={ styles.todoContainer}>
            { tasks.map((t : ITask) => <div className={ styles.todoItem }>{ t.name } &nbsp;&nbsp;{t.completed ? "Done" : "To do"}</div>) }
        </div>
    </div>
}

export default ToDoMain;
