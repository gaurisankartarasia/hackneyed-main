import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div style={{ position: 'relative', marginBottom: '1em' }}>
      {/* <CopyToClipboard text={code} onCopy={handleCopy}>
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: copied ? '#4caf50' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '0.9em',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </CopyToClipboard> */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: '5px',
          padding: '1em',
          fontSize: '0.9em',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
