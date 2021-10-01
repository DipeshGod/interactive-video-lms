import React from 'react';
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
import { useState } from 'react';
import { CSVReader } from 'react-papaparse';

const CreateEnterpriseSectionDialog = ({
  open,
  handleClose,
  enterpriseId,
  courses,
  handleToggle,
  checked,
}) => {
  const [title, setTitle] = useState('');
  const buttonRef = React.createRef<any>();

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  const handleCreateSection = () => {
    console.log('enterprise id', enterpriseId);
    console.log('selected courses', checked);
    console.log('title', title);
  };

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            <CSVReader
              ref={buttonRef}
              onFileLoad={handleOnFileLoad}
              onError={handleOnError}
              noClick
              noDrag
              onRemoveFile={handleOnRemoveFile}
            >
              {({ file }) => (
                <aside
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}
                >
                  <Button
                    size='small'
                    variant='outlined'
                    onClick={handleOpenDialog}
                    style={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '40%',
                    }}
                  >
                    Browse file
                  </Button>
                  <div
                    style={{
                      margin: '0 10px',
                      width: '60%',
                      color: '#e3a507',
                    }}
                  >
                    {file && file.name}
                  </div>
                  <Button
                    size='small'
                    variant='outlined'
                    style={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                    }}
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </Button>
                </aside>
              )}
            </CSVReader>
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
