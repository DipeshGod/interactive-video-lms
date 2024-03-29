import { Container } from '@material-ui/core';
import Layout from '../components/layout';
import Banner from '../components/home/Banner';
import Features from '../components/home/Features';
import PopularCourses from '../components/home/PopularCourses';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <Layout>
      <div>
        <Banner />
        <Container>
          <Features />
          <PopularCourses />
          {/* <Testimonials /> */}
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
