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
    ];

    // Remove the first occurrence of any title pattern at the beginning
    for (const pattern of titlePatterns) {
      html = html.replace(pattern, '').replace(/^\n+/, ''); // Also remove leading newlines
      break; // Only remove the first match
    }
  }

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Convert lists
  html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
  // Wrap consecutive <li> elements in a single <ul>
  html = html.replace(/((?:<li>[\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br/>');

  // Wrap in paragraph tags
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p><h/g, '<h');
  html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
  html = html.replace(/<p><ul>/g, '<ul>');
  html = html.replace(/<\/ul><\/p>/g, '</ul>');

  return html;
};

export default basicMarkdownToHtml;