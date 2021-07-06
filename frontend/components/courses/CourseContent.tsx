import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, RefetchOptions } from 'react-query';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  DialogActions,
} from '@material-ui/core';
import getCourseContent from '../../services/client/course/getCourseContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoPlayer from '../videoPlayer';
import Loading from '../Loading';
import Exercises from './exercises';
import getExerciseById from '../../services/client/exercise/getExerciseById';

const CourseContent = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [exerciseByModule, setExerciseByModule] = useState();
  const [moduleId, setModuleId] = useState('');

  const [data, setData] = useState(null);
  const router = useRouter();
  const courseId = router.query.id;

  const { isLoading } = useQuery(
    'courseContent',
    () => getCourseContent(courseId),
    {
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  const { isLoading: exerciseByModuleLoading } = useQuery(
    ['exercise', moduleId],
    () => getExerciseById(moduleId),
    {
      onSuccess: (data) => {
        setExerciseByModule(data);
      },
    }
  );

  const handleChange = (e, i) => {
    console.log(i);
  };

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
            {isQuizOpen && (
              <Exercises
                exerciseLoading={exerciseByModuleLoading}
                exercises={exerciseByModule}
                isQuizOpen={isQuizOpen}
                setIsQuizOpen={setIsQuizOpen}
              />
            )}
          </AccordionDetails>
          <AccordionDetails>
            <Link href={`/admin/courseContent/exercises/${module._id}`}>
              <Button variant='outlined' color='secondary' size='small'>
                Manage Exercises
              </Button>
            </Link>
            <Button
              size='small'
              variant='outlined'
              style={{ marginLeft: '1rem' }}
              onClick={() => setIsEditOpen(true)}
            >
              Edit Module
            </Button>
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
              <DialogTitle>Edit {module.title} Info</DialogTitle>
              <DialogContent style={{ minWidth: '50vw' }}>
                <Box>
                  <TextField
                    label='Module Title'
                    margin='dense'
                    variant='outlined'
                    value={data[index].title}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                  />
                </Box>
                <Box>
                  <TextField
                    label='Module Description'
                    margin='dense'
                    variant='outlined'
                    value={data[index].description}
                    multiline
                    rows={2}
                    fullWidth
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button>Update</Button>
                <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CourseContent;
