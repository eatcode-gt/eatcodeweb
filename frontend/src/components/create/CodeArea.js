import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react'
import { colors } from '../../global/vars'
export default function CodeArea({code, setCode}) {
  const styles = {
    codeEditor: {
      fontSize: '1.7em',
      backgroundColor: colors.codeBg,
      fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      minHeight: '50%'
    }
  }

  return (
    <CodeEditor
      value={code}
      language="py"
      placeholder="Please enter Python code."
      onChange={(evn) => setCode(evn.target.value)}
      style={styles.codeEditor}
    />
  );
}