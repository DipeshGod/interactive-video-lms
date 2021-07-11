import Link from "next/link";
import { Box, Button, Card, Typography } from "@material-ui/core";

const EnrolledCourseCard = ({ id }) => {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box
          padding="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          flexBasis="35%"
          style={{ backgroundColor: "red" }}
        >
          <Typography variant="overline" gutterBottom>
            Category
          </Typography>
          <Typography variant="h5" gutterBottom>
            Course Name
          </Typography>
        </Box>
        <Box flexBasis="65%" style={{ backgroundColor: "blue" }}>
          <Link href={`/course/dashboard?id=${id}`}>
            <Button variant="outlined" color="inherit">
              Continue
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default EnrolledCourseCard;
