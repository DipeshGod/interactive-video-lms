import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Button,
} from '@material-ui/core';
import getCourseContent from '../../services/client/course/getCourseContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoPlayer from '../videoPlayer';
import Loading from '../Loading';
import QuizCard from './QuizCard';

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

  return (
    <div style={{ marginBottom: '3rem' }}>
      <List>
        {data.map((module) => (
          <ListItem key={module._id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ backgroundColor: '#f5f5f5' }}
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
                {module.quizes.length > 0 && (
                  <>
                    <Button
                      variant='outlined'
                      onClick={() => setIsQuizOpen(true)}
                    >
                      Try out Quizes
                    </Button>
                    {isQuizOpen && (
                      <QuizCard
                        quizes={module.quizes}
                        handleClose={() => setIsQuizOpen(false)}
                      />
                    )}
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CourseContent;
