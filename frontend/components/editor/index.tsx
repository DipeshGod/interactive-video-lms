import dynamic from 'next/dynamic';
import { EDITOR_JS_TOOLS } from './tools';

const EditorComponent = dynamic(() => import('react-editor-js'), {
  ssr: false,
});

const Editor = () => {
  return (
    <div>
      <EditorComponent tools={EDITOR_JS_TOOLS} />
    </div>
  );
};

export default Editor;
