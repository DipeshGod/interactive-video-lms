import { useState } from 'react';
import { useQuery } from 'react-query';
import getCourseModuleById from '../../services/client/courseModule/getCourseModuleById';
import Loading from '../Loading';

const EditModule = ({ id }) => {
  const [data, setData] = useState();
  console.log(id);

  const { isLoading } = useQuery(
    ['courseModule', id],
    () => getCourseModuleById(id),
    {
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div>
      <h1>This is edit module</h1>
    </div>
  );
};

export default EditModule;
