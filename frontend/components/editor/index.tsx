import dynamic from 'next/dynamic';

import { EDITOR_JS_TOOLS } from './tools';
const EditorJs = dynamic(() => import('react-editor-js'), { ssr: false });

const Editor = ({ placeholder, handleDataChange }) => {
  return (
    <div>
      <EditorJs
        tools={EDITOR_JS_TOOLS}
        placeholder={placeholder}
        autofocus={true}
        onChange={handleDataChange}
      />
    </div>
  );
};

export default Editor;
