import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

const CreateEnterpriseSectionDialog = ({
  open,
  handleClose,
  enterpriseId,
  courses,
  handleToggle,
  checked,
}) => {
  const handleCreateSection = () => {};

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
          label='Section Name (Eg: Semester I)'
          fullWidth
        />
        <Box marginY='1rem'>
          <Typography variant='h6' gutterBottom>
            Select Courses
          </Typography>
          <Paper>
            <List>
              {courses.map((course, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${i}`}
                      src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${course.coursePoster}`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={course.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge='end'
                      onChange={handleToggle(course._id)}
                      checked={checked.indexOf(course._id) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        <Box marginY='1rem'>
          <Typography variant='h6' gutterBottom>
            Add Users From CSV file
          </Typography>
          <Box>
            <input type='file' accept='.csv' name='users' />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleCreateSection} color='primary'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEnterpriseSectionDialog;
