import { Divider, makeStyles, Theme, createStyles } from '@material-ui/core';
import CreateMultipleChoice from '../exercise/CreateMultipleChoice';
import CreateQuiz from '../exercise/CreateQuiz';
import CreateYesNo from '../exercise/CreateYesNo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    create: {
      flexBasis: '45%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
      },
    },
    list: {
      flexBasis: '45%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        order: -1,
        marginBottom: '2rem',
      },
    },
  })
);

const CreateExercise = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.create}>
        <CreateYesNo />
        <Divider style={{ margin: '2rem 0' }} />
        <CreateQuiz />
        <Divider style={{ margin: '2rem 0' }} />
        <CreateMultipleChoice />
      </div>
      <div className={classes.list}>
        <h3>This is where all list is shown</h3>
      </div>
    </div>
  );
};

export default CreateExercise;
