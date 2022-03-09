import * as React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { changeCardText } from "../../store/listsSlice"


export default function FormDialog({ text, id, listId }) {

  console.log(listId, "listId")

  const [open, setOpen] = React.useState(false);
  let [textCard, setTextCards] = useState(text);
  const dispatch = useDispatch();

  const changeText = (e) => {
    setTextCards(textCard = e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      dispatch(changeCardText({ id, listId, text: textCard }))
      handleClose()
    }
  }

  const setText = () => {
    dispatch(changeCardText({ id, listId, text: textCard }))
    handleClose()
  }

  return (
    <div>
      <EditIcon className="card__icon" onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Rename"
            variant="standard"
            type="text"
            id={String(id)}
            fullWidth
            value={textCard}
            onKeyDown={handleKeyDown}
            onChange={changeText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={setText}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}