import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableTitlePropsType = {
    title: string
    callBack: (name: string) => void
}

export const EditableTitle = (props: EditableTitlePropsType) => {

    const [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle !== '') {
            props.callBack(newTitle.trim())
        } else {
            setError('Title is required')
        }

    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
            setEdit(!edit)
        }
    }

    const editTrueHandler = () => {
        setEdit(!edit)
        addTaskHandler()
    }

    return (
        edit
            ? <input onBlur={editTrueHandler} autoFocus onChange={onChangeHandler} onKeyDown={onKeyDownHandler} type={'text'} value={newTitle}/>
            : <span onDoubleClick={editTrueHandler}>{props.title}</span>
    );
};

