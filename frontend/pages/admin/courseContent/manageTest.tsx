import { Container, Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import ManageExercise from "../../../components/admin/ManageExercise";
import Layout from "../../../components/layout";

const ManageTest = () => {
  const router = useRouter();

  return (
    <Layout>
      <Container>
        <Box marginY="6rem">
          <ManageExercise
            id={router.query.id}
            category={router.query.category}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default ManageTest;
