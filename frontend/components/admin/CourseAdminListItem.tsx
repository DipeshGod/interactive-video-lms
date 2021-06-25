import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TableRow, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditCourseInfo from './EditCourseInfo';
import { useMutation, useQueryClient } from 'react-query';
import deleteCourse from '../../services/client/course/deleteCourse';

const CourseAdminListItem = ({ course }) => {
  const [showEditCourseInfo, setShowEditCourseInfo] = useState(false);

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

  return (
    <TableRow>
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
          onClick={() => setShowEditCourseInfo(true)}
        >
          Edit Info
        </Button>
        {showEditCourseInfo && (
          <EditCourseInfo
            showEditCourseInfo={showEditCourseInfo}
            setShowEditCourseInfo={setShowEditCourseInfo}
            courseId={course._id}
          />
        )}
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
  );
};

export default CourseAdminListItem;
