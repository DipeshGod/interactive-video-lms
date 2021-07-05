import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  CardActions,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import deleteExercise from '../../services/client/exercise/deleteExercise';
import getExerciseById from '../../services/client/exercise/getExerciseById';
import Loading from '../Loading';

const ExerciseAdminList = ({ id }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(['exercise', id], () =>
    getExerciseById(id)
  );

  const deleteExerciseMutation = useMutation((id) => deleteExercise(id));

  const handleDeleteExercise = (exerciseId) => {
    deleteExerciseMutation.mutate(exerciseId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['exercise', id]);
        toast.warning('Course deleted successfully');
      },
      onError: () => {
        console.log('err aayo hai');
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <Typography variant='h6'>No Exercise Created</Typography>;
  }

  return (
    <div style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
      {data.map((item, i) => (
        <Card key={item._id} style={{ marginTop: '1rem' }} variant='outlined'>
          <CardActionArea>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                padding='10px'
              >
                <Badge color='secondary' badgeContent={i + 1} />
                <Typography variant='overline'>{item.type}</Typography>
              </Box>
              <Typography>{item.question}</Typography>
              {item.type === 'yesNo' && (
                <Typography color='primary'>
                  {item.answer[0] === 'true' ? 'Yes' : 'No'}
                </Typography>
              )}

              {item.type === 'quiz' &&
                item.options.map((option, i) => (
                  <Typography key={i} color='textSecondary' gutterBottom>
                    {option}
                  </Typography>
                ))}
              {item.type === 'multipleChoice' &&
                item.options.map((option, i) => (
                  <Typography key={i} color='textSecondary' gutterBottom>
                    {option}
                  </Typography>
                ))}

              {item.type !== 'yesNo' && (
                <Typography variant='subtitle2' color='primary'>
                  Answer:
                </Typography>
              )}
              {item.type === 'quiz' &&
                item.answer.map((answer, i) => (
                  <Typography key={i} gutterBottom>
                    {item.options[Number(answer)]}
                  </Typography>
                ))}
              {item.type === 'multipleChoice' &&
                item.answer.map((answer, i) => (
                  <Typography key={i} gutterBottom>
                    {item.options[Number(answer)]}
                  </Typography>
                ))}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              onClick={() => handleDeleteExercise(item._id)}
              aria-label='delete'
            >
              <DeleteIcon color='error' />
            </IconButton>
            <IconButton aria-label='delete'>
              <EditIcon color='primary' />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ExerciseAdminList;
