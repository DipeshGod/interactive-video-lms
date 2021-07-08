import Link from "next/link";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Container, Button, Box } from "@material-ui/core";
import Layout from "../../../components/layout";
import getCoursesById from "../../../services/server/course/getCourseById";
import CourseIntro from "../../../components/courses/CourseIntro";
import CreateNewModule from "../../../components/admin/CreateNewModule";
import CourseContent from "../../../components/courses/CourseContent";
import { useState } from "react";

const ManageCourseContent = ({ course, id }) => {
  const [showCreateNewModule, setShowCreateNewModule] = useState(false);

  return (
    <Layout>
      <div style={{ paddingTop: "2rem" }}>
        <Container>
          {/* <CourseIntro course={course} /> */}
          <Box marginY="2rem" display="flex" justifyContent="space-between">
            <Button
              color="primary"
              variant="contained"
              onClick={() => setShowCreateNewModule(true)}
            >
              Add A module
            </Button>
            <Link
              href={`/admin/courseContent/manageTest?id=${id}&category=preTest`}
            >
              <Button color="primary" variant="contained">
                Add Course Pre Test
              </Button>
            </Link>
            <Link
              href={`/admin/courseContent/manageTest?id=${id}&category=finalTest`}
            >
              <Button color="primary" variant="contained">
                Add Course Final Test
              </Button>
            </Link>
          </Box>
          <Box>
            <CourseContent />
          </Box>
        </Container>
        {showCreateNewModule && (
          <CreateNewModule
            showCreateNewModule={showCreateNewModule}
            setShowCreateNewModule={setShowCreateNewModule}
          />
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["course", params.id], () =>
    getCoursesById(params.id)
  );

  return {
    props: {
      course: dehydrate(queryClient).queries[0].state.data,
      id: params.id,
    },
  };
}

export default ManageCourseContent;
