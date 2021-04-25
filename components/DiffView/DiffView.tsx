import * as React from 'react';
import * as monaco from 'monaco-editor';

interface IDiffViewProps {
  prev?: string;
  next?: string;
}

// TODO: 임시로 monaco-editor로 사용, diff라이브러리로 수정고려
const DiffView: React.FunctionComponent<IDiffViewProps> = ({ prev, next }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneDiffEditor>();

  React.useEffect(() => {
    if (ref.current) {
      editorRef.current = monaco.editor.createDiffEditor(ref.current, {
        enableSplitViewResizing: false,
        renderSideBySide: false,
        originalEditable: false,
        readOnly: true,
      });
      return () => {
        editorRef.current?.dispose();
      };
    }
  }, []);

  React.useEffect(() => {
    const original = monaco.editor.createModel(prev ?? '', 'text/plain');
    const modified = monaco.editor.createModel(next ?? '', 'text/plain');
    editorRef.current?.setModel({ modified, original });
    return () => {
      original.dispose();
      modified.dispose();
    };
  }, [prev, next]);
  return <div style={{ height: 400 }} ref={ref}></div>;
};

export default DiffView;
