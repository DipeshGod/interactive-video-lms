import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

const CreateEnterpriseSectionDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Create New Section</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Creating new sections will help you create different groups of
          students. They will be shown the course which you will give access to.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Section Name (Eg: Semester I, Accounting)'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleClose} color='primary'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEnterpriseSectionDialog;
