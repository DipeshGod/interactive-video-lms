import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useQuery } from 'react-query';
import getNote from '../../services/client/courseModule/getNote';

const ModuleNotes = ({ moduleId }) => {
  const { isLoading, data } = useQuery(['note', moduleId], () =>
    getNote(moduleId)
  );

  if (isLoading || data.length === 0) {
    return null;
  }

  console.log('moduleId', data);

  return (
    <div>
      <Box marginBottom='10px'>
        <Typography variant='h6'>Notes: </Typography>
      </Box>
      {data.map((note, i) => (
        <Link href={`/course/notes/${note._id}`}>
          <Typography style={{ cursor: 'pointer' }}>
            {`${i + 1}. `}
            {note.title}
          </Typography>
        </Link>
      ))}
    </div>
  );
};

export default ModuleNotes;
