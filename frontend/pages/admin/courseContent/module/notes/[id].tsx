import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FilledInput,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Editor from "../../../../../components/editor";
import Layout from "../../../../../components/layout";
import { useMutation, useQueryClient } from "react-query";
import createNote from "../../../../../services/client/courseModule/createNote";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreateNotes = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState([]);

  const router = useRouter();
  const moduleId = router.query.id;

  const queryClient = useQueryClient();
  const noteMutation = useMutation((note: any) =>
    createNote(title, note, moduleId)
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDataChange = (api, data) => {
    setNote(data.blocks);
  };

  const handleNoteSubmit = () => {
    if (note.length > 0 && title.length > 5) {
      noteMutation.mutate(
        { title, note, moduleId },
        {
          onSuccess: () => {
            setTitle("");
            setNote([]);
            queryClient.invalidateQueries(["note", moduleId]);
          },
          onError: () => {
            console.log("err aayo hae");
          },
        }
      );
    } else {
      toast.error("Please create valid note");
    }
  };

  return (
    <Layout>
      <div style={{ paddingTop: "2rem", minHeight: "80vh" }}>
        <Container>
          <Box marginBottom="3rem">
            <Typography align="center" variant="h4">
              Notes for the module
            </Typography>
          </Box>
          <Grid container justify="space-between">
            <Grid item xs={12} md={5}>
              <Paper style={{ padding: "1rem" }}>
                <h3>This is where create notes will things will go</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Create New Note
              </Typography>
              <Box marginBottom="1rem">
                <FilledInput
                  style={{ backgroundColor: "#efebe9" }}
                  type="email"
                  margin="dense"
                  placeholder="Give the title for note"
                  fullWidth
                  value={title}
                  onChange={handleTitleChange}
                />
              </Box>
              <Editor
                placeholder="Start wrting note here"
                handleDataChange={handleDataChange}
              />
              <Button
                color="secondary"
                variant="outlined"
                style={{ marginBottom: "2rem" }}
                onClick={handleNoteSubmit}
              >
                Submit Note
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default CreateNotes;
