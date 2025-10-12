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

  // Convert links [text](url) to <a> tags
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

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

  // Convert nested lists (handle indented lists)
  // First handle nested items (indented with spaces or tabs)
  html = html.replace(/^ {2}- (.+)$/gim, '<li class="nested">$1</li>');
  html = html.replace(/^\t- (.+)$/gim, '<li class="nested">$1</li>');

  // Then handle regular list items
  html = html.replace(/^- (.+)$/gim, '<li>$1</li>');

  // Wrap consecutive <li> elements in <ul>, handling nested lists
  html = html.replace(/((?:<li[^>]*>[\s\S]*?<\/li>\s*)+)/g, (match) => {
    if (match.includes('class="nested"')) {
      // For nested items, wrap in a nested ul
      return match
        .replace(/<li class="nested">/g, '<ul><li>')
        .replace(/<\/li>/g, '</li></ul>');
    }
    return '<ul>' + match + '</ul>';
  });

  // Convert line breaks - handle paragraphs first, then single breaks
  // Split by double newlines to create separate paragraphs
  const paragraphs = html.split(/\n\n+/);

  // Process each paragraph separately
  html = paragraphs
    .filter((para) => para.trim().length > 0) // Remove empty paragraphs
    .map((para) => {
      let processedPara = para.trim();

      // Don't wrap headers, lists, or HR in paragraph tags
      if (
        processedPara.match(
          /^<h[1-6]>|^<ul>|^<\/ul>|^<li>|^<hr>|^<strong>\*\*|^\*\*/
        )
      ) {
        // For headers and structural elements, keep single line breaks as <br/>
        return processedPara.replace(/\n/g, '<br/>');
      }

      // For regular content, remove single line breaks (they should be paragraph breaks)
      // and wrap the entire content as a paragraph
      processedPara = processedPara.replace(/\n/g, ' ');

      // Only wrap in <p> tags if it's not already wrapped and contains actual content
      if (!processedPara.match(/^<[^>]+>/) && processedPara.length > 0) {
        return `<p>${processedPara}</p>`;
      }

      return processedPara;
    })
    .join('\n\n'); // Add double newlines between processed chunks

  // Clean up any malformed structure
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>[\s\S]*?<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<hr>)<\/p>/g, '$1');

  // Final cleanup - remove any residual excessive line breaks
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
};

export default basicMarkdownToHtml;
