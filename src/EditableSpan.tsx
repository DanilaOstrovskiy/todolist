import React, {ChangeEvent, FC, KeyboardEventHandler, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}

const EditableSpan = React.memo((props: EditableSpanPropsType
) => {
    console.log("editablespan")

    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
        setLocalTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(localTitle)
    }
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            offEditMode();
        }
    }

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
        console.log(localTitle)
    }

    return (
        editMode
            ? <TextField
                variant={"standard"}
                value={localTitle}
                onChange={changeLocalTitle}
                autoFocus={true}
                onBlur={offEditMode}
                onKeyPress={handleKeyDown}
            />
            : <span onDoubleClick={onEditMode}
                    className={props.spanClasses}>{localTitle}</span>
    );
})

export default EditableSpan;