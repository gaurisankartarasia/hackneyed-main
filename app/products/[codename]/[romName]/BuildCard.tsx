// components/BuildCard.tsx
'use client'
import { Build } from '@/types/rom';
import { RichTextContent } from './RichTextContent';
import { ExternalLink } from 'lucide-react';
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

interface BuildCardProps {
  build: Build;
  parsedCustomFields: Record<string, ParsedContent>;
  formatDate: (timestamp: number) => string;
}

export const BuildCard = ({ build, parsedCustomFields, formatDate }: BuildCardProps) => {
  return (
    <div className='p-1 border-t'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="space-y-2">
          <div className="space-y-1">
            <p>Last updated: {formatDate(build.createdAt)}</p>
          </div>
        </div>

        {build.downloadLinks && build.downloadLinks.length > 0 && (
          <div className='p-3'>
            <h4 className="font-medium mb-2"> Links:</h4>
            <ul className="space-y-2">
              {build.downloadLinks.map((link, index) => (
                <li key={`${build.id}-${link.url}-${index}`}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {link.label}

                    <ExternalLink size={15}/>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {build.warnings && build.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            {build.warnings.map((warning, index) => (
              // <MessageBar key={`warning-${warning.content.slice(0, 10)}-${index}`} intent='warning'>
              //   <MessageBarBody>
              //     <MessageBarTitle>Warning</MessageBarTitle>
              //     {warning.content}
              //   </MessageBarBody>
              // </MessageBar>
                  <Alert key={`warning-${warning.content.slice(0, 10)}-${index}`} variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                  {warning.content}
                  </AlertDescription>
                </Alert>
            
            ))}
          </div>
        </div>
      )}

      {build.customFields && Object.keys(build.customFields).length > 0 && (
        <div className="mt-6">
          <div className="p-4 space-y-2">
            {Object.entries(build.customFields).map(([label, content], index) => (
              <div key={`${build.id}-${label}-${index}`} className="flex flex-col space-y-1">
                <h1 className="text-xl">{label}:</h1>
                <div className="pl-4">
                  <RichTextContent parsedContent={parsedCustomFields[label]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
   

    </div>
  );
};






