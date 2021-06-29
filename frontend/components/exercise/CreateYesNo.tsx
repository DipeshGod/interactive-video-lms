import { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core';

const CreateYesNo = () => {
  const [value, setValue] = useState('yes');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Add A Yes/No Question
      </Typography>
      <Box marginY='1rem'>
        <TextField
          label='Enter a yes/no question'
          variant='outlined'
          fullWidth
        />
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='no' control={<Radio />} label='No' />
        </RadioGroup>
        <Button
          style={{ marginTop: '1rem' }}
          variant='outlined'
          color='primary'
        >
          Create Yes/No
        </Button>
      </Box>
    </>
  );
};

export default CreateYesNo;
