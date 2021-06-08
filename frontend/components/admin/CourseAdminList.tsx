import {
  Paper,
  TableContainer,
  Table,
  Typography,
  Box,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from '@material-ui/core';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Loading from '../Loading';
import getCourses from '../../services/client/course/getCourses';
import deleteCourse from '../../services/client/course/deleteCourse';

const CourseAdminList = () => {
  const { data, isLoading } = useQuery('courses', getCourses);
  const queryClient = useQueryClient();
  const courseDeleteMutation = useMutation((courseId: any) =>
    deleteCourse(courseId)
  );

  const handleCourseDelete = (courseId) => {
    if (!window.confirm('Are you sure u want to delete this course') === true) {
      return;
    }
    courseDeleteMutation.mutate(courseId, {
      onError: (err) => {
        console.log('error delete the course');
      },
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
      },
    });
  };

  const showCourses = (courses) => {
    return courses.map((course) => (
      <TableRow key={course._id}>
        <TableCell>
          <Typography variant='subtitle2' style={{ fontSize: '1.1rem' }}>
            {course.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Button
            variant='outlined'
            startIcon={<EditIcon color='error' />}
            size='small'
          >
            Edit Info
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant='outlined'
            startIcon={<DeleteIcon color='error' />}
            size='small'
            onClick={() => handleCourseDelete(course._id)}
          >
            Delete Course
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant='contained'
            color='primary'
            startIcon={<CloudUploadIcon />}
            size='small'
          >
            <Link href={`/admin/courseContent/${course._id}`}>
              <a>Manage Course Contents</a>
            </Link>
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return (
      <Typography variant='h5'>
        No Courses Available. Start creating.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant='h5' gutterBottom>
        ALL COURSES
      </Typography>
      <Box marginTop='2rem'>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 950 }}>
            <TableBody>{showCourses(data)}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CourseAdminList;
