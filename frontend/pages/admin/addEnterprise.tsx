import {
  Box,
  TextField,
  Typography,
  Container,
  InputBase,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Chip,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import getUserByEmail from '../../services/client/user/getUserByEmail';
import { toast } from 'react-toastify';
import getCourses from '../../services/client/course/getCourses';
import AddCourseList from '../../components/admin/AddCourseList';
import createEnterprise from '../../services/client/enterprise/createEnterprise';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',

      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.9),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '250px',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    addCourse: {
      backgroundColor: theme.palette.primary.dark,
      padding: '1rem',
    },
  })
);

const AddEnterprise = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [enterpriseName, setEnterpriseName] = useState('');
  const [enterpriseDescription, setEnterpriseDescription] = useState('');
  const [enterpriseAdmin, setEnterpriseAdmin] = useState('');
  const [checked, setChecked] = useState([]);
  const router = useRouter();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const queryClient = useQueryClient();
  const enterpriseMutation = useMutation((enterpriseData: any) =>
    createEnterprise(enterpriseData)
  );

  const { refetch } = useQuery(['userByEmail'], () => getUserByEmail(email), {
    enabled: false,
  });

  const { isLoading, data } = useQuery(['courses'], () => getCourses());

  const handleEmailSearch = async () => {
    const response = await refetch();
    if (response.data.length === 0) {
      toast.error('User not found');
      return;
    }
    setEnterpriseAdmin(response.data._id);
    toast.info('User added');
  };

  const handleCreateEnterprise = () => {
    if (enterpriseAdmin === '') {
      return toast.error('Please add enterprise admin');
    }
    if (checked.length === 0) {
      return toast.error(
        'Please give access to at least one course to enterprise'
      );
    }
    if (enterpriseName.length < 3) {
      return toast.error('Please provide enterprise name');
    }

    let data = {
      name: enterpriseName,
      description: enterpriseDescription,
      courses: checked,
      admins: [enterpriseAdmin],
      domain: enterpriseAdmin
        .split(' ')
        .map((n) => n[0])
        .join(''),
    };

    enterpriseMutation.mutate(data, {
      onSuccess: () => {
        router.push('/admin');
      },
      onError: (err) => {
        console.log('Couldnt create entperprise', err);
      },
    });
  };

  return (
    <Layout>
      <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
        <Container>
          <Typography variant='h5' align='center'>
            Add New Enterprise User
          </Typography>
          <Box marginY='2rem'>
            <Box>
              <TextField
                fullWidth
                label='Enter enterprise name'
                variant='filled'
                value={enterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
              />
            </Box>
            <Box marginTop='1rem'>
              <TextField
                fullWidth
                label='Enter enterprise description'
                variant='filled'
                multiline
                value={enterpriseDescription}
                onChange={(e) => setEnterpriseDescription(e.target.value)}
              />
            </Box>
            <Box marginTop='1rem'>
              <Typography variant='overline' style={{ fontSize: '1.2rem' }}>
                Add Enterprise Admin
              </Typography>
              <Box className={classes.addCourse} display='flex'>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Search email…'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>

                <Button
                  variant='contained'
                  size='small'
                  style={{ backgroundColor: '#ffb300' }}
                  onClick={handleEmailSearch}
                >
                  ADD
                </Button>
              </Box>
              {enterpriseAdmin && (
                <Chip
                  style={{
                    marginTop: '1rem',

                    cursor: 'pointer',
                    backgroundColor: '#ffb300',
                    color: 'white',
                  }}
                  label={email}
                  icon={
                    <HighlightOffIcon onClick={() => setEnterpriseAdmin('')} />
                  }
                />
              )}
            </Box>
            <Box marginTop='1rem'>
              <Typography variant='overline' style={{ fontSize: '1.2rem' }}>
                Add Courses
              </Typography>

              {isLoading ? (
                <Typography>Loading Courses</Typography>
              ) : (
                <AddCourseList
                  courses={data}
                  handleToggle={handleToggle}
                  checked={checked}
                />
              )}
            </Box>

            <Button
              variant='outlined'
              color='primary'
              style={{ marginTop: '2rem' }}
              size='large'
              onClick={handleCreateEnterprise}
            >
              Create Enterprise
            </Button>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default AddEnterprise;
