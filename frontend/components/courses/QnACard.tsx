import { useRouter } from "next/router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import getQnA from "../../services/client/course/getQnA";
import Loading from "../Loading";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Editor from "../editor";
import renderEditor from "../../utils/renderEditor";

const QnACard = ({ courseId }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery(["qna", courseId], () =>
    getQnA(courseId)
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Paper elevation={3} style={{ padding: "1rem", height: "75vh" }}>
      <Typography variant="h6" align="center">
        Frequent Questions and Answers
      </Typography>
      <Box marginY="1rem">
        {data.map((qna, i) => (
          <Accordion
            key={qna._id}
            style={{ marginBottom: "1rem" }}
            variant="outlined"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="caption">{qna.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {data[i].response.length > 0 &&
                  renderEditor(data[i].response[0].answer[0])}
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Button
                onClick={() =>
                  router.push(`/course/qnaDetails?qnaId=${qna._id}`)
                }
                variant="outlined"
                color="secondary"
              >
                Details
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};

export default QnACard;
