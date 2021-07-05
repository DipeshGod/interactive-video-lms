import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@material-ui/core';
import getCourseContent from '../../services/client/course/getCourseContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoPlayer from '../videoPlayer';
import Loading from '../Loading';

const CourseContent = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
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
        <Accordion key={module._id} style={{ marginTop: '1rem' }} elevation={3}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{
              backgroundColor: '#f5f5f5',
            }}
          >
            <Typography variant='h6'>{module.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{module.description}</AccordionDetails>

          {module.videos.map((video) => (
            <AccordionDetails key={video.title}>
              <Accordion variant='outlined'>
                <AccordionSummary
                  style={{ backgroundColor: '#fafafa' }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{video.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <VideoPlayer
                    poster={``}
                    videoSources={video}
                    videoTitle={''}
                  />
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          ))}
          <AccordionDetails>
            {module.hasExercise && (
              <Button color='primary' variant='outlined'>
                Take A Quiz
              </Button>
            )}
          </AccordionDetails>
          <AccordionDetails>
            <Link href={`/admin/courseContent/exercises/${module._id}`}>
              <Button variant='outlined' color='secondary'>
                Manage Exercises
              </Button>
            </Link>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CourseContent;
