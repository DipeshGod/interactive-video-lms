import { useState } from 'react';
import { Container, Divider } from '@material-ui/core';
import EditModule from '../../../../components/admin/EditModule';
import ManageExercise from '../../../../components/admin/ManageExercise';
import Layout from '../../../../components/layout';
import dynamic from 'next/dynamic';
import {
  useSaveCallback,
  useLoadData,
  options,
  useSetData,
  useClearDataCallback,
} from '../../../../components/editor';

const Editor = dynamic(
  () =>
    import('../../../../components/editor').then(
      (mod: any) => mod.EditorContainer
    ),
  { ssr: false }
);

export async function getServerSideProps(context) {
  const id = context.params.id;
  const category = context.query.category;
  return {
    props: { id, category }, // will be passed to the page component as props
  };
}

const Module = ({ id, category }) => {
  const [editor, setEditor] = useState(null);

  // save handler
  const onSave = useSaveCallback(editor);

  // load data
  const { data, loading } = useLoadData();

  // set saved data
  useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const disabled = editor === null || loading;

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Editor
            reInit={true}
            editorRef={setEditor}
            options={options}
            data={data}
          />
          <EditModule id={id} />
          <Divider style={{ margin: '2rem 0' }} />
          <ManageExercise id={id} category={category} />
        </Container>
      </div>
    </Layout>
  );
};

export default Module;
