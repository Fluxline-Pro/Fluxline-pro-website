// Helper function to convert markdown to HTML- No React needed
export const basicMarkdownToHtml = (
  markdown: string,
  documentTitle?: string
): string => {
  let html = markdown;

  // Remove duplicate title if it matches the document title
  if (documentTitle) {
    // Split the content into lines to check the first few lines
    const lines = html.split('\n');
    let titleRemoved = false;

    // Check the first 3 lines for title patterns that include the document title
    for (let i = 0; i < Math.min(3, lines.length) && !titleRemoved; i++) {
      const line = lines[i].trim();

      // Check if line contains the document title (case insensitive)
      const containsTitle = line
        .toLowerCase()
        .includes(documentTitle.toLowerCase());

      // Check if it's a markdown header or plain text title
      const isMarkdownHeader = line.startsWith('#');
      const isPlainTitle = !isMarkdownHeader && line.length > 0;

      if (containsTitle && (isMarkdownHeader || isPlainTitle)) {
        // Remove this line
        lines.splice(i, 1);

        // Also remove the next line if it's empty (this removes the extra break)
        if (i < lines.length && lines[i].trim() === '') {
          lines.splice(i, 1);
        }

        // Rebuild the HTML and remove leading newlines
        html = lines.join('\n').replace(/^\n+/, '');
        titleRemoved = true;
      }
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

  // Add hidden spacer elements between text blocks for visual separation
  // Replace groups of 4 or more <br /> tags with hidden <hr> spacers
  html = html.replace(/(<br\s*\/>\s*){4,}/g, '<hr class="text-spacer" />');

  // Clean up excessive breaks
  html = html.replace(/(<br \/><br \/>){3,}/g, '<br /><br />');

  return html;
};

export default basicMarkdownToHtml;
