import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from '@material-ui/core';

const AddCourseList = ({ courses, handleToggle, checked }) => {
  return (
    <Paper>
      <List>
        {courses.map((course, i) => (
          <ListItem key={i} button>
            <ListItemAvatar>
              <Avatar
                alt={`${i}`}
                src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${course.coursePoster}`}
              />
            </ListItemAvatar>
            <ListItemText primary={course.name} />
            <ListItemSecondaryAction>
              <Checkbox
                edge='end'
                onChange={handleToggle(course._id)}
                checked={checked.indexOf(course._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AddCourseList;
