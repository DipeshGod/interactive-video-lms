import dynamic from 'next/dynamic';
import { EDITOR_JS_TOOLS } from './tools';

const EditorComponent = dynamic(() => import('react-editor-js'), {
  ssr: false,
});

const Editor = () => {
  return (
    <div>
      <h2>This is editor</h2>
    </div>
  );
};

export default Editor;
