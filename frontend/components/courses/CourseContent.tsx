import Link from 'next/link';
import { useContext, useState } from 'react';
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
import Exercises from './exercises';
import getExerciseById from '../../services/client/exercise/getExerciseById';
import { Context as UserContext } from '../../context/user';
import ModuleNotes from './ModuleNotes';

const CourseContent = () => {
  const { state } = useContext(UserContext);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [exerciseByModule, setExerciseByModule] = useState();
  const [moduleId, setModuleId] = useState('');

  const [data, setData] = useState(null);
  const router = useRouter();
  const courseId = router.query.id;

  const { isLoading } = useQuery(
    ['courseContent', courseId],
    () => getCourseContent(courseId),
    {
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  const { isLoading: exerciseByModuleLoading } = useQuery(
    ['exercise', moduleId],
    () => getExerciseById(moduleId, 'module'),
    {
      onSuccess: (data) => {
        setExerciseByModule(data);
      },
      retry: false,
    }
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div style={{ marginBottom: '3rem' }}>
      {data.map((module, index) => (
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
            <ModuleNotes moduleId={module._id} />
          </AccordionDetails>
          <AccordionDetails>
            {module.hasExercise && (
              <Button
                color='primary'
                variant='outlined'
                onClick={() => {
                  setIsQuizOpen(!isQuizOpen);
                  setModuleId(module._id);
                }}
              >
                Take A Quiz
              </Button>
            )}
            {isQuizOpen && exerciseByModule && (
              <Exercises
                exerciseLoading={exerciseByModuleLoading}
                exercises={exerciseByModule}
                isQuizOpen={isQuizOpen}
                setIsQuizOpen={setIsQuizOpen}
              />
            )}
          </AccordionDetails>
          {state.user.type === 'superAdmin' && (
            <AccordionDetails>
              <Link
                href={`/admin/courseContent/module/${module._id}?category=module`}
              >
                <Button variant='outlined' color='secondary' size='small'>
                  Manage Module
                </Button>
              </Link>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </div>
  );
};

export default CourseContent;
