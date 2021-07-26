import dynamic from 'next/dynamic';

import { EDITOR_JS_TOOLS } from './tools';
const EditorJs = dynamic(() => import('react-editor-js'), { ssr: false });

const Editor = () => {
  return (
    <div>
      <EditorJs tools={EDITOR_JS_TOOLS} />
    </div>
  );
};

export default Editor;
