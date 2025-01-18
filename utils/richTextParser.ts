// utils/richTextParser.ts
export const parseRichTextContent = (content: string) => {
    if (typeof window === 'undefined') 
      return { parts: [], codeContents: [], warningContents: [] };
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
  
    const codeElements = tempDiv.getElementsByTagName('code');
    const codeContents: string[] = [];
    Array.from(codeElements).forEach((codeEl, index) => {
      codeContents.push(codeEl.textContent || '');
      codeEl.replaceWith(`__CODE_PLACEHOLDER_${index}__`);
    });
  
    const warningElements = tempDiv.getElementsByTagName('warning');
    const warningContents: string[] = [];
    Array.from(warningElements).forEach((warningEl, index) => {
      warningContents.push(warningEl.textContent || '');
      warningEl.replaceWith(`__WARNING_PLACEHOLDER_${index}__`);
    });
  
    const htmlContent = tempDiv.innerHTML;
    const parts = htmlContent.split(/(\_\_CODE_PLACEHOLDER_\d+\_\_|\_\_WARNING_PLACEHOLDER_\d+\_\_)/);
  
    return { parts, codeContents, warningContents };
  };
  