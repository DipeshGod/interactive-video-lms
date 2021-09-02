import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import updateUserProgress from '../../../services/client/user/updateUserProgress';
import { useQueryClient } from 'react-query';

const Result = ({ score, total, courseId, userId, category }) => {
  const queryClient = useQueryClient();

  const userCourseProgressMutation = useMutation((progressData: any) =>
    updateUserProgress(courseId, userId, progressData)
  );

  useEffect(() => {
    if (category === 'preTest') {
      userCourseProgressMutation.mutate(
        {
          preTest: {
            solvedQuestions: score,
            totalQuestions: total,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['progress']);
          },
          onError: () => {
            console.log('couldnt update progress');
          },
        }
      );
    }
    if (category === 'module') {
      userCourseProgressMutation.mutate(
        {
          module: {
            id: courseId,
            solvedQuestions: score,
            totalQuestions: total,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['progress']);
          },
          onError: () => {
            console.log('couldnt update progress');
          },
        }
      );
    }
  }, []);

  return (
    <div>
      <Typography variant='h5' gutterBottom>
        You have completed the quiz.
      </Typography>
      <Typography variant='h6'>
        You got {score}/{total} right.
      </Typography>
    </div>
  );
};

export default Result;
