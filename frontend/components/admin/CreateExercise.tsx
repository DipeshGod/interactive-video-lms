import { Divider } from '@material-ui/core';
import CreateMultipleChoice from '../exercise/CreateMultipleChoice';
import CreateQuiz from '../exercise/CreateQuiz';
import CreateYesNo from '../exercise/CreateYesNo';

const CreateExercise = () => {
  return (
    <div>
      <CreateYesNo />
      <Divider style={{ margin: '2rem 0' }} />
      <CreateQuiz />
      <Divider style={{ margin: '2rem 0' }} />
      <CreateMultipleChoice />
    </div>
  );
};

export default CreateExercise;
