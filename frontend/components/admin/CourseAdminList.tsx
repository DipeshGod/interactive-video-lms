import {
  Paper,
  TableContainer,
  Table,
  Typography,
  Box,
  TableBody,
} from '@material-ui/core';
import CourseAdminListItem from './CourseAdminListItem';

const CourseAdminList = ({ courses }) => {
  const showCourses = (courses) => {
    return courses.map((course) => (
      <CourseAdminListItem key={course._id} course={course} />
    ));
  };

  if (courses.length === 0) {
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
            <TableBody>{showCourses(courses)}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CourseAdminList;
