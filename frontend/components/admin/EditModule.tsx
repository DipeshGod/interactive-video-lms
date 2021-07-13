import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import editCourseModule from '../../services/client/courseModule/editCourseModule';
import getCourseModuleById from '../../services/client/courseModule/getCourseModuleById';
import Loading from '../Loading';

const EditModule = ({ id }) => {
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(
    ['courseModule', id],
    () => getCourseModuleById(id),
    {
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  const mutation = useMutation((updatedModule) =>
    editCourseModule(updatedModule, id)
  );

  const handleEditModule = () => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.info('Course updated successfully');
      },
      onError: () => {
        console.log('error occurred');
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <Typography variant='h5'>Edit Module </Typography>
      <Box marginY='1rem'>
        <TextField
          label='Title'
          value={data.title}
          variant='outlined'
          onChange={(e) => setData({ ...data, title: e.target.value })}
          fullWidth
        />
      </Box>
      <Box marginY='1rem'>
        <TextField
          label='Description'
          value={data.description}
          variant='outlined'
          multiline
          onChange={(e) => setData({ ...data, description: e.target.value })}
          fullWidth
        />
      </Box>
      <Box marginY='1rem'>
        <FormControl component='fieldset'>
          <FormLabel>Has Exercise</FormLabel>
          <RadioGroup
            name='hasExercise'
            value={data.hasExercise}
            onChange={(e) => {
              setData({
                ...data,
                hasExercise: e.target.value === 'true' ? true : false,
              });
            }}
          >
            <FormControlLabel value={true} control={<Radio />} label='True' />
            <FormControlLabel value={false} control={<Radio />} label='False' />
          </RadioGroup>
        </FormControl>
      </Box>

      <Button color='primary' variant='outlined' onClick={handleEditModule}>
        Edit Module
      </Button>
    </div>
  );
};

export default EditModule;
