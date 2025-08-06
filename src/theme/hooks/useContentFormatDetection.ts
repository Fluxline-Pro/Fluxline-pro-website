/**
 * Hook to detect the format of content based on string analysis
 * Detects Markdown, MDX, HTML, or plain text
 */

type ContentFormat = 'markdown' | 'mdx' | 'html' | 'text';

/**
 * Detects the most likely format of a content string
 * @param content - The string content to analyze
 * @returns The detected format ('markdown', 'mdx', 'html', or 'text')
 */
export const useContentFormatDetection = (content: string): ContentFormat => {
  // Helper functions to check different formats
  const containsHtml = (str: string): boolean => {
    // If the string is empty or not a string at all, it's not HTML
    if (!str || typeof str !== 'string') {
      return false;
    }

    /* DEBUG LOG - Commented out to reduce console noise
    // Enhanced debugging to see what we're checking
    console.log(
      `[FormatDetection] Checking HTML format for content: "${str.slice(0, 50)}..."`
    );
    */

    // 1. First check for HTML patterns that are most clear and definitive
    // Look for complete HTML tags with content between them
    const completeTagPattern = /<([a-z][a-z0-9]*)\b[^>]*>[\s\S]*?<\/\1>/i;

    // Check for complete HTML elements first (opening and closing tags)
    if (completeTagPattern.test(str)) {
      /* DEBUG LOG - Commented out to reduce console noise
      console.log(
        '[FormatDetection] HTML detected: found complete HTML elements with closing tags'
      );
      */
      return true;
    }

    // 2. Look for common HTML formatting that would indicate HTML content

    // Check for paragraph tags - very common in rich text content
    const paragraphCheck =
      /<p>[\s\S]*?<\/p>/i.test(str) || /<p\s[^>]*>[\s\S]*?<\/p>/i.test(str);

    // Check for heading tags - common in structured content
    const headingCheck =
      /<h[1-6]>[\s\S]*?<\/h[1-6]>/i.test(str) ||
      /<h[1-6]\s[^>]*>[\s\S]*?<\/h[1-6]>/i.test(str);

    // Check for list elements - common in structured content
    const listCheck =
      /<(ul|ol)>[\s\S]*?<\/(ul|ol)>/i.test(str) ||
      /<li>[\s\S]*?<\/li>/i.test(str);

    // Check for div containers - very common in HTML layout
    const divCheck =
      /<div>[\s\S]*?<\/div>/i.test(str) ||
      /<div\s[^>]*>[\s\S]*?<\/div>/i.test(str);

    // Check for links - common in interactive content
    const linkCheck = /<a\s+href=[^>]+>[\s\S]*?<\/a>/i.test(str);

    // Check for images - common in rich content
    const imgCheck = /<img\s+[^>]*>/i.test(str);

    // Check for styled text - common formatting
    const styleCheck = /<(strong|em|b|i|u|s|span)[^>]*>[\s\S]*?<\/\1>/i.test(
      str
    );

    // If any of these specific patterns match, it's likely HTML
    if (
      paragraphCheck ||
      headingCheck ||
      listCheck ||
      divCheck ||
      linkCheck ||
      imgCheck ||
      styleCheck
    ) {
      /* DEBUG LOG - Commented out to reduce console noise
      console.log(
        '[FormatDetection] HTML detected through specific element checks'
      );
      */
      return true;
    }

    // 3. If more specific checks fail, look for any valid HTML tag pattern

    // This pattern matches proper HTML tags like <p>, <div>, <span>, etc.
    const htmlTagRegex =
      /<\/?[a-z][a-z0-9]*(?:\s+[a-z0-9\-_]+(?:=(?:".*?"|'.*?'|[^'">\s]+))?)*\s*\/?>/i;

    // Check for common HTML elements that often appear in content
    const commonHtmlElements =
      /<(?:p|div|span|h[1-6]|ul|ol|li|a|img|br|hr|table|tr|td|th|strong|em|b|i|u|s)\b/i;

    // Check for any HTML tag
    if (commonHtmlElements.test(str)) {
      /* DEBUG LOG - Commented out to reduce console noise
      console.log(
        '[FormatDetection] HTML detected through common element check'
      );
      */
      return true;
    }

    // More general HTML tag check as a last resort
    if (htmlTagRegex.test(str)) {
      /* DEBUG LOG - Commented out to reduce console noise
      console.log('[FormatDetection] HTML detected through general tag regex');
      */
      return true;
    }

    /* DEBUG LOG - Commented out to reduce console noise
    console.log('[FormatDetection] No HTML patterns detected');
    */
    return false;
  };

  const containsMdx = (str: string): boolean => {
    // MDX often contains JSX/component syntax and specific MDX patterns
    const mdxPatterns = [
      // React components (capitalized tags)
      /<[A-Z][a-zA-Z]*((\s+[a-zA-Z]+=".*?"|\s+[a-zA-Z]+=\{.*?\})*)\s*\/?>/,

      // Import statements
      /import\s+.*?\s+from\s+['"].*?['"];?/,

      // Export statements
      /export\s+(?:default|const|function|class|let|var)\s+/,

      // JSX expressions in curly braces
      /\{.*?\}/,

      // JSX props with values in curly braces
      /\s+[a-zA-Z]+=\{.*?\}/,

      // MDX-specific component usage
      /<(MDX|MDXProvider|MDXContent)\b/,

      // Common pattern of markdown with embedded components
      /#{1,6}\s+.*<[A-Z][a-zA-Z]*.*>/,
    ];

    return mdxPatterns.some((pattern) => pattern.test(str));
  };

  const containsMarkdown = (str: string): boolean => {
    // Check for common Markdown syntax with more specific patterns
    const markdownRegex =
      /(?:^|\n)(?:#{1,6}\s|>\s|\*\s|\d+\.\s|```|\*\*|__|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\))/;

    // Also check for markdown formatting patterns with more comprehensive detection
    const markdownPatterns = [
      /\*\*(.*?)\*\*/, // bold
      /\*(.*?)\*/, // italic
      /__(.*?)__/, // underline
      /^>(.*)$/m, // blockquote
      /^#{1,6}\s+(.*)$/m, // headers
      /^[-*+]\s+(.*)$/m, // unordered list
      /^[0-9]+\.\s+(.*)$/m, // ordered list
      /\[([^\]]+)\]\(([^)]+)\)/, // links
      /!\[([^\]]+)\]\(([^)]+)\)/, // images
      /```[a-z]*\n[\s\S]*?\n```/, // code blocks
      /`([^`]+)`/, // inline code
      /~~(.*?)~~/, // strikethrough
      /^\s*---\s*$/m, // horizontal rule
      /\|(.+)\|(.+)\|/, // tables (basic detection)
    ];

    return (
      markdownRegex.test(str) ||
      markdownPatterns.some((pattern) => pattern.test(str))
    );
  };

  // Apply the detection logic
  // First check for Markdown and MDX since that's the most common format from your Azure storage
  if (containsMarkdown(content)) {
    return 'markdown';
  } else if (containsMdx(content)) {
    return 'mdx';
  } else if (containsHtml(content)) {
    return 'html';
  } else {
    return 'text';
  }
};

export default useContentFormatDetection;