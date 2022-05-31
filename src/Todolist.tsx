import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import s from './todolist.module.css'
import {Checkbox} from "./components/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    toDoList: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeFilter: (value: FilterValuesType, toDoListID: string) => void
    addTask: (newTitle: string, toDoListID: string) => void
    isDone: (is: string, isDone: boolean, toDoListID: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title !== '') {
            props.addTask(title.trim(), props.toDoList)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filterValue: FilterValuesType, toDoListID: string) => {
        {
            props.changeFilter(filterValue, toDoListID)
        }
    }
    const removeTaskHandler = (iTD: string, toDoListID: string) => {
        {
            props.removeTask(iTD, toDoListID)
        }
    }

    const onChangeHandler = (tID: string, isDone: boolean, toDoListID: string) => {
        props.isDone(tID, isDone, toDoListID)
    }


    return <div>
               <h3>
                   {props.title}
                   <button onClick={() => props.removeToDoList(props.toDoList)}>X</button>
               </h3>

        <div>
            <input value={title} onChange={inputHandler} onKeyDown={onKeyDownHandler} className={error ? s.error : ''}/>
            <Button name='+' callback={addTaskHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        return (<li key={t.id} className={t.isDone ? s.isDone : ''}>
                            <Checkbox isDone={t.isDone}
                                      callback={(isDone) => onChangeHandler(t.id, isDone, props.toDoList)}/>
                            {/*<input type="checkbox" checked={t.isDone} onChange={(event) => onChangeHandler(t.id, event)}/>*/}
                            <span>{t.title}</span>
                            <Button name={'x'} callback={() => removeTaskHandler(t.id, props.toDoList)}/>
                            {/*<button onClick={removeTaskHandler}>x</button>*/}
                        </li>)
                    }
                )
            }
        </ul>
        <div>
            <Button name='All' callback={() => changeFilterHandler('all', props.toDoList)}
                    className={props.filter === 'all' ? s.isActive : ''}/>
            <Button name='Active' callback={() => changeFilterHandler('active', props.toDoList)}
                    className={props.filter === 'active' ? s.isActive : ''}/>
            <Button name='Completed' callback={() => changeFilterHandler('completed', props.toDoList)}
                    className={props.filter === 'completed' ? s.isActive : ''}/>
        </div>
    </div>
}
