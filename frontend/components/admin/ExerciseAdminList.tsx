import { useQuery } from 'react-query';
import getExerciseById from '../../services/client/exercise/getExerciseById';
import Loading from '../Loading';

const ExerciseAdminList = ({ id }) => {
  const { data, isLoading } = useQuery(['exercise', id], () =>
    getExerciseById(id)
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log('data', data);

  return (
    <div>
      {data.map((item) => (
        <h4>{item.question}</h4>
      ))}
    </div>
  );
};

export default ExerciseAdminList;
