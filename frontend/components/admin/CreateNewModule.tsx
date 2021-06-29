import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
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
import { useMutation, useQueryClient } from 'react-query';
import validator from 'validator';
import createCourseModule from '../../services/client/courseModule/createCourseModule';
import { toast } from 'react-toastify';

const CreateNewModule = ({ showCreateNewModule, setShowCreateNewModule }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadResponse, setUploadResponse] = useState<any>();
  const [quizes, setQuizes] = useState();
  const formRef = useRef<any>();

  const router = useRouter();

  const queryClient = useQueryClient();
  const courseModuleMutation = useMutation((course: any) =>
    createCourseModule(course)
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCourseModuleVideoUpload = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    [...e.target.moduleVideos.files].forEach((file, i) =>
      formData.append(file.name, file)
    );

    try {
      const res = await api.post('/api/upload/course-module/video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      if (res.status === 200) {
        setMessage('Files Uploaded');
        setUploadResponse(res.data);
      } else {
        setMessage('Something went wrong');
        return;
      }
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
      return;
    }
  };

  const handleModuleCreateSubmit = async (e) => {
    e.preventDefault();
    // setIsButtonDisabled(true);
    const { moduleTitle, moduleDescription } = formRef.current;
    if (!validator.isLength(moduleTitle.value, { min: 5 })) {
      setError('Please enter valid course name');
      return;
    } else if (!validator.isLength(moduleDescription.value, { min: 10 })) {
      setError('Course description must be of length at least 10');
      return;
    }
    const courseData = {
      title: moduleTitle.value,
      description: moduleDescription.value,
      courseId: router.query.id,
      videos: uploadResponse,
      quizes: quizes,
    };

    courseModuleMutation.mutate(courseData, {
      onSuccess: () => {
        queryClient.invalidateQueries('courseModule');
        setIsButtonDisabled(false);
        toast.success(`Course created successfully`);
        setShowCreateNewModule(false);
      },
      onError: (error: any) => {
        toast.error('Something went wrong');
        setIsButtonDisabled(false);
      },
    });
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
          ref={formRef}
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
        </form>

        <Box marginTop='1rem'>
          <form onSubmit={handleCourseModuleVideoUpload}>
            <Typography gutterBottom variant='overline'>
              Select the videos for this module in order
            </Typography>
            <input
              name='moduleVideos'
              type='file'
              accept='video/*'
              multiple
              onChange={handleFileChange}
            />
            <Button
              size='small'
              variant='contained'
              color='primary'
              type='submit'
            >
              Upload
            </Button>
            <LinearProgress
              style={{ margin: '10px 0' }}
              variant='determinate'
              value={uploadPercentage}
            />
            {message && (
              <Typography variant='subtitle2'>Videos Uploaded</Typography>
            )}
          </form>
        </Box>

        <DialogActions>
          <Button color='primary' onClick={() => setShowCreateNewModule(false)}>
            Cancel
          </Button>
          <Button
            color='primary'
            variant='outlined'
            disableElevation
            type='submit'
            onClick={handleModuleCreateSubmit}
            disabled={isButtonDisabled}
          >
            Create Module
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewModule;
