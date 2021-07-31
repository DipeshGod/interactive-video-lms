import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';

const renderEditor = (content) => {
  console.log(content);

  switch (content.type) {
    case 'paragraph':
      return (
        <Typography style={{ marginBottom: '1rem' }}>
          {content.data.text}
        </Typography>
      );

    case 'header':
      const level: any = `h${content.data.level}`;
      return (
        <Typography style={{ marginBottom: '1rem' }} variant={level}>
          {content.data.text}
        </Typography>
      );

    case 'table':
      return (
        <TableContainer
          style={{ margin: '1.5rem 0' }}
          component={Paper}
          variant='outlined'
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

    case 'list':
      const { style, items } = content.data;
      if (style === 'unordered') {
        return (
          <ul>
            {items.map((item, i) => (
              <li key={i} style={{ marginBottom: '1rem' }}>
                {item}
              </li>
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
    case 'warning':
      return (
        <Tooltip style={{ marginBottom: '1rem' }} title={content.data.message}>
          <Typography variant='caption' color='error'>
            {content.data.title}
          </Typography>
        </Tooltip>
      );

    case 'image':
      return <Image width='600px' height='600px' src={content.data.file.url} />;

    default:
      return null;
  }
};

export default renderEditor;
