import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    isDone:boolean,
    callback: (isDone:boolean) => void
}

export const Checkbox = (props:CheckboxPropsType) => {

    const ChangeIsDoneHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }

    return (
        <>
            <input type="checkbox"
                   checked={props.isDone}
                   onChange={ChangeIsDoneHandler}/>
        </>
    );
};

