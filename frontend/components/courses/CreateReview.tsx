import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Rating } from '@material-ui/lab';
import { useMutation, useQueryClient } from 'react-query';
import createReview from '../../services/client/course/createReview';
import { toast } from 'react-toastify';

const CreateReview = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);
  const router = useRouter();

  const queryClient = useQueryClient();
  const courseMutation = useMutation((review: any) => createReview(review));

  const handleReviewSubmit = () => {
    const course = router.query.slug;
    const user = JSON.parse(localStorage.getItem('user'))._id;
    if (comment.length < 5) {
      return;
    }
    let reviewData = {
      course,
      user,
      comment,
      rating,
    };
    courseMutation.mutate(reviewData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['review', course]);
        setIsButtonDisabled(false);
        toast.success(`Thank you for your review`);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
        setIsButtonDisabled(false);
      },
    });
  };

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Leave Us Your Valuable Review
        </Typography>
        <TextField
          variant='outlined'
          size='small'
          placeholder='Write your review here'
          fullWidth
          multiline
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box component='fieldset' marginTop={3} borderColor='transparent'>
          <Typography component='legend'>
            How do you rate this course
          </Typography>
          <Rating
            name='rating'
            value={Number(rating)}
            precision={0.5}
            size='large'
            onChange={(e: any) => setRating(e.target.value)}
            emptyIcon={<StarBorderIcon fontSize='inherit' />}
          />
        </Box>
        <CardActions>
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            onClick={handleReviewSubmit}
          >
            Submit Review
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CreateReview;
