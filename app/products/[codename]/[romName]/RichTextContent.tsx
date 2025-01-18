// components/RichTextContent.tsx
'use client'
import CodeBlock from '@/components/code';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {AlertCircle} from 'lucide-react'

interface ParsedContent {
  parts: string[];
  codeContents: string[];
  warningContents: string[];
}

interface RichTextContentProps {
  parsedContent: ParsedContent;
}

export const RichTextContent = ({ parsedContent }: RichTextContentProps) => {
  const { parts, codeContents, warningContents } = parsedContent;

  return (
    <div className="prose prose-sm prose-invert max-w-none space-y-2">
      {parts.map((part: string, index: number) => {
        const codePlaceholderMatch = part.match(/\_\_CODE_PLACEHOLDER_(\d+)\_\_/);
        const warningPlaceholderMatch = part.match(/\_\_WARNING_PLACEHOLDER_(\d+)\_\_/);
        const uniqueKey = `content-part-${index}-${part.slice(0, 10)}`;

        if (codePlaceholderMatch) {
          const codeIndex = parseInt(codePlaceholderMatch[1]);
          return (
            <div key={uniqueKey} className='w-fit'>
              <CodeBlock code={codeContents[codeIndex]} language="javascript" />
            </div>
          );
        }

        if (warningPlaceholderMatch) {
          const warningIndex = parseInt(warningPlaceholderMatch[1]);
          return (
            <div key={uniqueKey} className="w-fit h-fit">
              {/* <MessageBar intent='warning'>
                <MessageBarBody>
                  <MessageBarTitle>Warning</MessageBarTitle>
                  {warningContents[warningIndex]}
                </MessageBarBody>
              </MessageBar> */}
              <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
      {warningContents[warningIndex]}
      </AlertDescription>
    </Alert>
            </div>
          );
        }

        return part.trim() ? (
          <div key={uniqueKey} dangerouslySetInnerHTML={{ __html: part }} />
        ) : null;
      })}
    </div>
  );
};
