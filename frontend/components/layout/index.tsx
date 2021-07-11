import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Footer from './Footer';
import Navbar from './navbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      minHeight: '93vh',
    },
  })
);

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
