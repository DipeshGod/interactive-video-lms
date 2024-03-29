import api from '../../services/api';

let Embed = '';
let Table = '';
let Paragraph = '';
let List = '';
let Warning = '';
let Code = '';
let LinkTool = '';
let Image = '';
let Raw = '';
let Header = '';
let Quote = '';
let Marker = '';
let CheckList = '';
let Delimiter = '';
let InlineCode = '';
let SimpleImage = '';

if (typeof window != 'undefined') {
  Embed = require('@editorjs/embed');
  Table = require('@editorjs/table');
  Paragraph = require('@editorjs/paragraph');
  List = require('@editorjs/list');
  Warning = require('@editorjs/warning');
  Code = require('@editorjs/code');
  LinkTool = require('@editorjs/link');
  Image = require('@editorjs/image');
  Raw = require('@editorjs/raw');
  Header = require('@editorjs/header');
  Quote = require('@editorjs/quote');
  Marker = require('@editorjs/marker');
  CheckList = require('@editorjs/checklist');
  Delimiter = require('@editorjs/delimiter');
  InlineCode = require('@editorjs/inline-code');
  SimpleImage = require('@editorjs/simple-image');
}

export const EDITOR_JS_TOOLS: any = {
  embed: Embed,
  table: Table,
  paragraph: Paragraph,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          let data = new FormData();
          data.append('picture', file, file.fileName);
          return api
            .post('/api/upload/course/picture', data, {
              headers: {
                accept: 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${file._boundary}`,
              },
            })
            .then((res) => {
              console.log('dsad', res);
              return {
                success: 1,
                file: {
                  url: `http://localhost:5000${res.data}`,
                  // any other image data you want to store, such as width, height, color, extension, etc
                },
              };
            });
        },
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
