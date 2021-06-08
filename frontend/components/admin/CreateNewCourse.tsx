import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  DialogContentText,
  Dialog,
  DialogTitle,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import validator from 'validator';
import api from '../../services/api';
import createCourse from '../../services/client/course/createCourse';

const CreateNewCourse = ({ showCreateNewCourse, setShowCreateNewCourse }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadResponse, setUploadResponse] = useState<any>();
  const formRef = useRef<any>();

  const queryClient = useQueryClient();
  const courseMutation = useMutation((course: any) => createCourse(course));

  const handleFileChange = (e) => {
    setFile([...e.target.files]);
    console.log(file);
  };

  const handleCourseIntroUpload = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    [...e.target.courseIntroFiles.files].forEach((file, i) =>
      formData.append(file.name, file)
    );

    try {
      const res = await api.post('/api/upload/course/intro', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      if (res.status === 200) {
        setMessage('File Uploaded');
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

  const handleCourseCreateSubmit = async () => {
    // setIsButtonDisabled(true);
    const {
      courseName,
      courseDescription,
      courseCategory,
      courseFeatures,
      courseGoals,
      courseInstructors,
      coursePrice,
    } = formRef.current;
    if (!validator.isLength(courseName.value, { min: 5 })) {
      setError('Please enter valid course name');
      return;
    } else if (!validator.isLength(courseDescription.value, { min: 10 })) {
      setError('Course description must be of length at least 10');
      return;
    }
    const courseData = {
      name: courseName.value,
      description: courseDescription.value,
      category: courseCategory.value,
      price: coursePrice.value,
      features: courseFeatures.value.split(', '),
      goals: courseGoals.value.split(', '),
      introductoryVideo: uploadResponse.introductoryVideo,
      coursePoster: uploadResponse.coursePoster,
      instructors: courseInstructors.value.split(', '),
    };

    courseMutation.mutate(courseData, {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
        setIsButtonDisabled(false);
        toast.success(`Course created successfully`);
        setShowCreateNewCourse(false);
      },
      onError: (error: any) => {
        toast.error('Something went wrong');
        setIsButtonDisabled(false);
      },
    });
  };

  return (
    <Dialog
      open={showCreateNewCourse}
      onClose={() => setShowCreateNewCourse(false)}
    >
      <DialogTitle>Create New Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the following informations to create new course.
        </DialogContentText>
        {error && (
          <DialogContentText className='error' color='error'>
            {error}
          </DialogContentText>
        )}
        <form
          ref={formRef}
          id='courseData'
          onInputCapture={() => {
            setError(null);
            setIsButtonDisabled(false);
          }}
        >
          <TextField
            label='Course Name'
            placeholder='enter the course name'
            defaultValue='nepal'
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            name='courseName'
          />
          <TextField
            label='Course Description'
            placeholder='enter the course description'
            fullWidth
            size='small'
            variant='outlined'
            multiline
            margin='dense'
            name='courseDescription'
          />
          <TextField
            label='Course Category'
            placeholder='e.g BBA, Information Technology, Music'
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            name='courseCategory'
          />
          <TextField
            label='Course Price'
            placeholder='e.g Rs.5000'
            fullWidth
            size='small'
            type='number'
            variant='outlined'
            margin='dense'
            name='coursePrice'
          />
          <TextField
            label='Course Features'
            placeholder='comma separated features of the course'
            fullWidth
            size='small'
            variant='outlined'
            multiline
            margin='dense'
            name='courseFeatures'
          />
          <TextField
            label='Course Goals'
            placeholder='comma separated goals of the course'
            fullWidth
            size='small'
            variant='outlined'
            multiline
            margin='dense'
            name='courseGoals'
          />
          <TextField
            label='Instructors'
            placeholder='comma separated names of instructors'
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            name='courseInstructors'
          />
        </form>

        <form onSubmit={handleCourseIntroUpload}>
          <Typography gutterBottom variant='overline'>
            Please select the thumbnail image and introductory video of the
            course
          </Typography>
          <input
            name='courseIntroFiles'
            type='file'
            multiple
            accept='image/*,video/*'
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
            style={{ marginTop: '10px' }}
            variant='determinate'
            value={uploadPercentage}
          />
          {message && <Typography variant='subtitle2'>{message}</Typography>}
        </form>

        <DialogActions>
          <Button color='primary' onClick={() => setShowCreateNewCourse(false)}>
            Cancel
          </Button>
          <Button
            id='courseData'
            color='primary'
            variant='outlined'
            disableElevation
            type='submit'
            onClick={handleCourseCreateSubmit}
            disabled={isButtonDisabled}
          >
            Create Course
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewCourse;
