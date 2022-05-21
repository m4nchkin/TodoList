import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import s from './todolist.module.css'

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
    isDone: (is: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title !== '') {
            props.addTask(title.trim())
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

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        {
            props.changeFilter(filterValue)
        }
    }
    const removeTaskHandler = (iTD: string) => {
        {
            props.removeTask(iTD)
        }
    }

    const onChangeHandler = (tID: string, event: ChangeEvent<HTMLInputElement>) => {
        props.isDone(tID, event.currentTarget.checked)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={inputHandler} onKeyDown={onKeyDownHandler} className={error ? s.error : ''}/>
            <Button name='+' callback={addTaskHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                        // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        //     props.isDone(t.id, event.currentTarget.checked)
                        // }
                        return (<li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={(event) => onChangeHandler(t.id, event)}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callback={() => removeTaskHandler(t.id)}/>
                            {/*<button onClick={removeTaskHandler}>x</button>*/}
                        </li>)
                    }
                )
            }
        </ul>
        <div>
            <Button name='All' callback={() => changeFilterHandler('all')} className={props.filter === 'all' ? s.isActive : ''}/>
            <Button name='Active' callback={() => changeFilterHandler('active')} className={props.filter === 'active' ? s.isActive : ''}/>
            <Button name='Completed' callback={() => changeFilterHandler('completed')} className={props.filter === 'completed' ? s.isActive : ''}/>
        </div>
    </div>
}
