import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
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
            </Accordion>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CourseContent;
