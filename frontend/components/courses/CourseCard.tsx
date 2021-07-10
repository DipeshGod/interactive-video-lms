import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  Typography,
  createStyles,
  Box,
  Button,
  Container,
  makeStyles,
  Theme,
  Chip,
} from "@material-ui/core";
import { Context as UserContext } from "../../context/user";
import { useMutation } from "react-query";
import editUser from "../../services/client/user/editUser";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "550px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginBottom: "2rem",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    courseTitle: {
      fontSize: "1.65rem",
    },
    learnMore: {
      marginRight: "1rem",
    },
  })
);

const CourseCard = ({ name, description, price, id, isFree }) => {
  const router = useRouter();
  const [raised, setRaised] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles();

  const userEditMutation = useMutation((updatedData: any) =>
    editUser(state.user._id, updatedData)
  );

  const handleStartCourse = () => {
    const { enrolledCourse } = state.user;
    if (enrolledCourse.includes(id)) {
      return router.push("/dashboard");
    }
    userEditMutation.mutate(
      { enrolledCourse: [...enrolledCourse, id] },
      {
        onSuccess: (data) => {
          dispatch({ type: "COURSE_ENROLL", payload: data });
          toast.info("Erolled successfully");
        },
        onError: (err) => {
          console.log("err aayo");
        },
      }
    );
  };

  return (
    <div>
      <Card raised={raised} className={classes.card}>
        <div
          style={{
            padding: "1rem 0",
          }}
        >
          <Container
            onMouseOver={() => setRaised(true)}
            onMouseLeave={() => setRaised(false)}
          >
            <Typography
              variant="h5"
              className={classes.courseTitle}
              gutterBottom
            >
              {name}
            </Typography>

            <Box marginTop="1rem">
              <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
                {description}
              </Typography>
            </Box>
            <Box
              marginTop="2rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Link href={`/courses/${id}`}>
                  <Button variant="outlined" className={classes.learnMore}>
                    Details
                  </Button>
                </Link>
                {isFree ? (
                  <Button
                    onClick={handleStartCourse}
                    color="primary"
                    variant="contained"
                    disableElevation
                  >
                    Start Course
                  </Button>
                ) : (
                  <Button variant="outlined">ENROLL NOW</Button>
                )}
              </Box>
              {isFree ? <Chip label="Free" /> : <Chip label={`Rs. ${price}`} />}
            </Box>
          </Container>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
