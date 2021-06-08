import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import api from '../../services/api';
import { useMutation } from 'react-query';
import createCourseModule from '../../services/client/course/createCourseModule';

const CreateNewModule = ({ showCreateNewModule, setShowCreateNewModule }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const courseModuleMutation = useMutation((course: any) =>
    createCourseModule(course)
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleModuleCreateSubmit = async (e) => {
    e.preventDefault();

    //course video
    let formData = new FormData();

    formData.append('title', e.target.moduleTitle.value);

    [...e.target.moduleVideos.files].forEach((file, i) =>
      formData.append(file.name, file)
    );

    try {
      const res = await api.post('/upload/course/video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      if (res.status === 201) {
        setMessage('File Uploaded');
      }

      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }

    //course data
    // const courseModuleData = {
    //   title: e.target.moduleTitle.value,
    //   description: e.target.moduleDescription.value,
    // };

    // courseModuleMutation.mutate(courseModuleData, {
    //   onSuccess: () => {
    //     console.log('course module created successfully');
    //     setIsButtonDisabled(false);
    //   },
    //   onError: (error) => {
    //     console.log('error creating the course module', error);
    //     setIsButtonDisabled(false);
    //   },
    // });
  };

  return (
    <Dialog
      open={showCreateNewModule}
      onClose={() => setShowCreateNewModule(false)}
    >
      <DialogTitle>Create New Module</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the following informations to create new module.
        </DialogContentText>
        {error && (
          <DialogContentText className='error' color='error'>
            {error}
          </DialogContentText>
        )}
        <form
          onSubmit={handleModuleCreateSubmit}
          onInputCapture={() => {
            setError(null);
            setIsButtonDisabled(false);
          }}
        >
          <TextField
            label='Module Title'
            placeholder='enter the module title'
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            name='moduleTitle'
          />
          <TextField
            label='Module Description'
            placeholder='enter the module description'
            fullWidth
            size='small'
            variant='outlined'
            multiline
            margin='dense'
            name='moduleDescription'
          />

          <Box marginTop='1rem'>
            <Typography gutterBottom variant='overline'>
              Please select the videos for this module in order
            </Typography>
            <input
              name='moduleVideos'
              type='file'
              accept='video/*'
              multiple
              onChange={handleFileChange}
            />
            <LinearProgress
              style={{ marginTop: '10px' }}
              variant='determinate'
              value={uploadPercentage}
            />
            {message && (
              <Typography variant='subtitle2'>Videos Uploaded</Typography>
            )}
          </Box>

          <DialogActions>
            <Button
              color='primary'
              onClick={() => setShowCreateNewModule(false)}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              variant='outlined'
              disableElevation
              type='submit'
              disabled={isButtonDisabled}
            >
              Create Module
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewModule;
