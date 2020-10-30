import { IconButton, TextField } from '@material-ui/core';
import { LibraryAdd } from '@material-ui/icons';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type AddItemFormPropsType={
    addItem:(title:string)=>void
}

export const AddItemForm = React.memo((props:AddItemFormPropsType) => {
    console.log('AddItemForm');
    let [newTasktitle, setnewTasktitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setnewTasktitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.charCode === 13 && buttonAddItem()
        if(error){
            setError(null)
        }
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
    <TextField
        variant='outlined'
        value={newTasktitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label='Title'
        helperText={error}
        error={!!error} />
    <IconButton color='primary' onClick={buttonAddItem}>
        <LibraryAdd fontSize='large'/>
    </IconButton>
</div>
})