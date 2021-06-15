import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import getCourseContent from '../../services/client/course/getCourseContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoPlayer from '../videoPlayer';
import Loading from '../Loading';

const CourseContent = () => {
  const router = useRouter();
  const courseId = router.query.id;

  const { data, isLoading } = useQuery('courseContent', () =>
    getCourseContent(courseId)
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div style={{ marginBottom: '3rem' }}>
      {data.map((module) => (
        <Accordion key={module._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h6'>{module.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{module.description}</AccordionDetails>

          {module.videos.map((video) => (
            <AccordionDetails key={video.title}>
              <VideoPlayer
                poster={``}
                videoSources={video}
                videoTitle={''}
              />
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </div>
  );
};

export default CourseContent;
