import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../todolist.module.css";
import {Button} from "./Button";

type AddFormItemPropsType = {
    callback: (title: string) => void
}

export const AddFormItem = (props: AddFormItemPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title !== '') {
            props.callback(title.trim())
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

    return (
        <div>
            <input value={title} onChange={inputHandler} onKeyDown={onKeyDownHandler} className={error ? s.error : ''}/>
            <Button name='+' callback={addTaskHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

