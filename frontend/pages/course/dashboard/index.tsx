import { Container } from "@material-ui/core";
import React from "react";
import CourseContent from "../../../components/courses/CourseContent";
import Layout from "../../../components/layout";

const CourseDashboard = () => {
  return (
    <Layout>
      <div style={{ marginTop: "6rem" }}>
        <Container>
          <h1>This is course dashboard</h1>
          <CourseContent />
        </Container>
      </div>
    </Layout>
  );
};

export default CourseDashboard;
