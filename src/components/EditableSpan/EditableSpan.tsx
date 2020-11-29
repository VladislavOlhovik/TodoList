import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";

export type EditableSpanPropsType = {
  disabled: boolean
  isDone?: boolean;
  title: string;
  onChange: (newTitle: string) => void;
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan");
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState("");
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const activateEditMode = () => {
    if(props.disabled){
      setEditMode(true);
      setTitle(props.title);
    }
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span
      onDoubleClick={activateEditMode}
      title={"to change it use a double click"}
      className={props.isDone ? "is-done" : ""}
    >
      {props.title}
    </span>
  );
});
