import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    // const changeFilterAll = () => {
    //     {props.changeFilter("all")}
    // }
    // const changeFilterActive = () => {
    //     {props.changeFilter("active")}
    // }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        {
            props.changeFilter(filterValue)
        }
    }
    // const removeTaskHandler = (iTD: string) => {
    //     {
    //         props.removeTask(iTD)
    //     }
    // }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={inputHandler} onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                        return (<li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>)
                    }
                )
            }
                </ul>
                    <div>
                        <button onClick={() => {
                            changeFilterHandler('all')
                        }}>All
                        </button>
                        <button onClick={() => {
                            changeFilterHandler('active')
                        }}>Active
                        </button>
                        <button onClick={() => {
                            changeFilterHandler('completed')
                        }}>Completed
                        </button>
                    </div>
                </div>
                }
