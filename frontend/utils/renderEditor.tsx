import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";

const renderEditor = (content) => {
  switch (content.type) {
    case "paragraph":
      return <Typography>{content.data.text}</Typography>;

    case "header":
      const level: any = `h${content.data.level}`;
      return <Typography variant={level}>{content.data.text}</Typography>;

    case "table":
      return (
        <TableContainer
          style={{ marginTop: "1.5rem" }}
          component={Paper}
          variant="outlined"
        >
          <Table>
            <TableBody>
              {content.data.content.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, i) => (
                    <TableCell key={i}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

    case "list":
      const { style, items } = content.data;
      if (style === "unordered") {
        return (
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      } else {
        return (
          <ol>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
    case "warning":
      return (
        <Tooltip title={content.data.message}>
          <Typography variant="caption" color="error">
            {content.data.title}
          </Typography>
        </Tooltip>
      );

    default:
      return null;
  }
};

export default renderEditor;
