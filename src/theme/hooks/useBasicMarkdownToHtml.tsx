// Helper function to convert markdown to HTML- No React needed
export const basicMarkdownToHtml = (
  markdown: string,
  documentTitle?: string
): string => {
  let html = markdown;

  // Remove duplicate title if it matches the document title
  if (documentTitle) {
    // Create regex patterns to match the title in various formats
    const titlePatterns = [
      new RegExp(`^# ${documentTitle}\\s*$`, 'gim'), // # TITLE
      new RegExp(`^# ${documentTitle.toUpperCase()}\\s*$`, 'gim'), // # TITLE (uppercase)
      new RegExp(`^# ${documentTitle.toLowerCase()}\\s*$`, 'gim'), // # title (lowercase)
      new RegExp(`^${documentTitle}\\s*$`, 'gim'), // TITLE (no markdown)
      new RegExp(`^${documentTitle.toUpperCase()}\\s*$`, 'gim'), // TITLE (uppercase, no markdown)
      // Handle title with subtitle format
      new RegExp(`^# ${documentTitle}:.*$`, 'gim'), // # TITLE: subtitle
      new RegExp(`^${documentTitle}:.*$`, 'gim'), // TITLE: subtitle (no markdown)
    ];

    // Remove the first occurrence of any title pattern at the beginning
    for (const pattern of titlePatterns) {
      html = html.replace(pattern, '').replace(/^\n+/, ''); // Also remove leading newlines
      break; // Only remove the first match
    }
  }

  // Convert horizontal rules (--- becomes <hr>)
  html = html.replace(/^---\s*$/gim, '<hr>');

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert lists (handle indented lists)
  html = html.replace(/^ {2,}- (.+)$/gim, '<li>$1</li>');
  html = html.replace(/^\t+- (.+)$/gim, '<li>$1</li>');
  html = html.replace(/^- (.+)$/gim, '<li>$1</li>');

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/((?:<li[^>]*>[\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Convert links [text](url) to <a> tags
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Convert single line breaks to double <br /> for proper spacing
  html = html.replace(/\n/g, '<br /><br />');

  // Comprehensive list cleanup (remove any br tags around ALL list elements)
  html = html.replace(
    /<li([^>]*)>([^<]*?)<br\s*\/?>\s*<br\s*\/?>/g,
    '<li$1>$2'
  );
  html = html.replace(/<li([^>]*)>([^<]*?)<br\s*\/?>/g, '<li$1>$2');
  html = html.replace(/<br\s*\/?>\s*<br\s*\/?>\s*<\/li>/g, '</li>');
  html = html.replace(/<br\s*\/?>\s*<\/li>/g, '</li>');
  html = html.replace(/(<\/li>)\s*<br\s*\/?>\s*<br\s*\/?>\s*(<li)/g, '$1$2');
  html = html.replace(/(<\/li>)\s*<br\s*\/?>\s*(<li)/g, '$1$2');
  html = html.replace(/(<\/li>)\s*<br\s*\/?>\s*<br\s*\/?>/g, '$1');
  html = html.replace(/(<\/li>)\s*<br\s*\/?>/g, '$1');
  html = html.replace(/(<ul[^>]*>)\s*<br\s*\/?>\s*<br\s*\/?>/g, '$1');
  html = html.replace(/(<ul[^>]*>)\s*<br\s*\/?>/g, '$1');
  html = html.replace(/<br\s*\/?>\s*<br\s*\/?>\s*(<\/ul>)/g, '$1');
  html = html.replace(/<br\s*\/?>\s*(<\/ul>)/g, '$1');

  // Add spacing after structural elements (but not immediately after list elements)
  html = html.replace(/(<\/ul>)\s*<br\s*\/?>\s*<br\s*\/?>/g, '$1');
  html = html.replace(/(<\/ul>)\s*<br\s*\/?>/g, '$1');
  html = html.replace(/(<\/ul>)(?!\s*<br)/g, '$1<br /><br />');
  html = html.replace(/(<\/h[1-6]>)(?!\s*<br)/g, '$1<br /><br />');
  html = html.replace(/(<hr>)(?!\s*<br)/g, '$1<br /><br />');

  // Clean up excessive breaks
  html = html.replace(/(<br \/><br \/>){3,}/g, '<br /><br />');

  return html;
};

export default basicMarkdownToHtml;
