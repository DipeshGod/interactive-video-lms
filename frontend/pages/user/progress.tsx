import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TrackingBarChart from "../../components/courses/TrackingBarChart";
import Layout from "../../components/layout";
import Loading from "../../components/Loading";
import getUserModuleProgress from "../../services/client/user/getUserModuleProgress";

const Progress = () => {
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("user"))._id);
  }, []);

  const { isLoading, data } = useQuery([userId], () =>
    getUserModuleProgress(userId)
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log("data", data);

  return (
    <Layout>
      <div style={{ paddingTop: "2rem", minHeight: "80vh" }}>
        <Container>
          <TrackingBarChart />
        </Container>
      </div>
    </Layout>
  );
};

export default Progress;
