import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import s from './todolist.module.css'
import {Checkbox} from "./components/Checkbox";
import {AddFormItem} from "./components/AddFormItem";
import {EditableTitle} from "./components/EditableTitle";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    toDoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeFilter: (value: FilterValuesType, toDoListID: string) => void
    addTask: (newTitle: string, toDoListID: string) => void
    isDone: (is: string, isDone: boolean, toDoListID: string) => void
    filter: FilterValuesType
    editTodoListTitle: (todolistID:string,newTitle:string) => void
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState('')
    // let [error, setError] = useState<string | null>(null)

    // const addTaskHandler = () => {
    //     if (title !== '') {
    //         props.addTask(title.trim(), props.toDoList)
    //         setTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    //
    // }
    //
    // const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         addTaskHandler()
    //     }
    // }

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

    const addFormHandler = (title: string) => {
        props.addTask(title, props.toDoListID)
    }

    const editToDoName = (name:string) => {
        props.editTodoListTitle(props.toDoListID, name)
    }

    return <div>
        <h3>
            <EditableTitle title={props.title} callBack={editToDoName}/>
            <button onClick={() => props.removeToDoList(props.toDoListID)}>X</button>
        </h3>
        <div>
            <AddFormItem callback={addFormHandler}/>
        </div>

        {/*    <input value={title} onChange={inputHandler} onKeyDown={onKeyDownHandler} className={error ? s.error : ''}/>*/}
        {/*    <Button name='+' callback={addTaskHandler}/>*/}
        {/*    {error && <div className={s.errorMessage}>{error}</div>}*/}
        <ul>
            {
                props.tasks.map(t => {
                        return (<li key={t.id} className={t.isDone ? s.isDone : ''}>
                            <Checkbox isDone={t.isDone}
                                      callback={(isDone) => onChangeHandler(t.id, isDone, props.toDoListID)}/>
                            {/*<input type="checkbox" checked={t.isDone} onChange={(event) => onChangeHandler(t.id, event)}/>*/}
                            <span>{t.title}</span>
                            <Button name={'x'} callback={() => removeTaskHandler(t.id, props.toDoListID)}/>
                            {/*<button onClick={removeTaskHandler}>x</button>*/}
                        </li>)
                    }
                )
            }
        </ul>
        <div>
            <Button name='All' callback={() => changeFilterHandler('all', props.toDoListID)}
                    className={props.filter === 'all' ? s.isActive : ''}/>
            <Button name='Active' callback={() => changeFilterHandler('active', props.toDoListID)}
                    className={props.filter === 'active' ? s.isActive : ''}/>
            <Button name='Completed' callback={() => changeFilterHandler('completed', props.toDoListID)}
                    className={props.filter === 'completed' ? s.isActive : ''}/>
        </div>
    </div>
}
