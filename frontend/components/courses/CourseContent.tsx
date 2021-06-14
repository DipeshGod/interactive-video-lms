import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import getCourseContent from '../../services/client/course/getCourseContent';

const CourseContent = () => {
  const router = useRouter();
  const courseId = router.query.id;

  const { data, isLoading } = useQuery('courseContent', () =>
    getCourseContent(courseId)
  );

  console.log(data);

  return (
    <div>
      <h2>This is course content</h2>
    </div>
  );
};

export default CourseContent;
