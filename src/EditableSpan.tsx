import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType={
    title:string
    onChange:(newTitle:string)=>void
}
export function EditableSpan(props:EditableSpanPropsType){
    let [editMode,setEditMode]=useState<boolean>(false)
    let [title,setTitle]=useState('')
    const activateViewMode =()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const changeTitle=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return editMode
    ?<input value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode} title={'to change it use a double click'}>{props.title}</span>
}