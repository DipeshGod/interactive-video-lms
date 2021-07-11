import { Typography, Container, Box } from "@material-ui/core";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import CourseCard from "../../components/courses/CourseCard";
import Layout from "../../components/layout";
import getCourses from "../../services/server/course/getCourses";

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("courses", () => getCourses());

  return {
    props: {
      courses: dehydrate(queryClient).queries[0].state.data,
    },
  };
}

const Courses = ({ courses }) => {
  return (
    <Layout>
      <div style={{ paddingTop: "2rem", minHeight: "80vh" }}>
        <Container>
          <Box>
            <Typography align="center" variant="h4" gutterBottom>
              OUR COURSES
            </Typography>
            <Typography align="center" variant="h5" gutterBottom>
              Here are the courses we currenly offer. More to come !
            </Typography>
          </Box>
          <Box marginY="3rem">
            {courses.map((course) => (
              <CourseCard
                name={course.name}
                description={course.description}
                price={course.price}
                id={course._id}
                isFree={course.isFree}
                key={course._id}
              />
            ))}
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default Courses;
