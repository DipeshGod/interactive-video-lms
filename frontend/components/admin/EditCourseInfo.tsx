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
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import validator from 'validator';
import api from '../../services/api';
import editCourseInfo from '../../services/client/course/editCourseInfo';
import getCoursesById from '../../services/client/course/getCourseById';
import Loading from '../Loading';

const EditCourseInfo = ({
  showEditCourseInfo,
  setShowEditCourseInfo,
  courseId,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadResponse, setUploadResponse] = useState<any>();
  const formRef = useRef<any>();
  const [updatedData, setUpdatedData] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['course', courseId],
    () => getCoursesById(courseId),
    {
      onSuccess: (data) => {
        setUpdatedData(data);
      },
    }
  );

  const courseEditMutation = useMutation((course: any) =>
    editCourseInfo(course)
  );

  const handleFileChange = (e) => {
    setFile([...e.target.files]);
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

  const handleCourseEditSubmit = async () => {
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

    console.log(courseData);

    // courseMutation.mutate(courseData, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries('courses');
    //     setIsButtonDisabled(false);
    //     toast.success(`Course created successfully`);
    //     setShowEditCourseInfo(false);
    //   },
    //   onError: (error: any) => {
    //     toast.error('Something went wrong');
    //     setIsButtonDisabled(false);
    //   },
    // });
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log('ud', updatedData);

  return (
    <Dialog
      open={showEditCourseInfo}
      onClose={() => setShowEditCourseInfo(false)}
    >
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please change the content that needs to be updated.
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
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            name='courseName'
            value={updatedData.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
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
            value={updatedData.description}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, description: e.target.value })
            }
          />
          <TextField
            label='Course Category'
            placeholder='e.g BBA, Information Technology, Music'
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            name='courseCategory'
            value={updatedData.category}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, category: e.target.value })
            }
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
            value={updatedData.price}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, price: e.target.value })
            }
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
          <Button color='primary' onClick={() => setShowEditCourseInfo(false)}>
            Cancel
          </Button>
          <Button
            id='courseData'
            color='primary'
            variant='outlined'
            disableElevation
            type='submit'
            onClick={handleCourseEditSubmit}
            disabled={isButtonDisabled}
          >
            Upadate Course Info
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseInfo;
