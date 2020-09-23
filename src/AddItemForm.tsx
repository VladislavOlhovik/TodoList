import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type AddItemFormPropsType={
    addItem:(title:string)=>void
}

export function AddItemForm (props:AddItemFormPropsType){
    let [newTasktitle, setnewTasktitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setnewTasktitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.charCode === 13 && buttonAddItem()
        setError(null)
    }
    const buttonAddItem = () => {
        if (newTasktitle.trim() !== '') {
            props.addItem(newTasktitle)
            setnewTasktitle('')
        } else {
            setError('Title is required')
        }
    }
    return <div>
    <input value={newTasktitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''} />
    <button onClick={buttonAddItem}>+</button>
    {error && <div className='error-message'>{error}</div>}
</div>
}