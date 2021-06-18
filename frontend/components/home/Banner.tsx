import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default Banner;
