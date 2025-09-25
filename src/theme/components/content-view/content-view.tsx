import React from 'react';
import { isDayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
// Dynamic imports for optional dependencies
// import { MDXProvider } from '@mdx-js/react';
// import ReactMarkdown from 'react-markdown';
// import DOMPurify from 'dompurify';

import { BaseCard } from '../card/base-card/base-card';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Container } from '../../layouts/Container';
import { Typography } from '../typography/typography';
import { AuthorTagline } from '../author-tagline/author-tagline';
import { FluentButton } from '../button/button';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import { useContentFilterStore } from '../../../store/store-specs/contentFilterStore';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';
import { useContentFormatDetection } from '../../hooks/useContentFormatDetection';
import { ContentItem } from '../../../pages/unified-content-page/unified-content-page';
import {
  getNavigationInfo,
  getListButtonText,
  getBasePath,
} from '../../../utils/contentNavigation';
import {
  // debugAuthorResolution,
  resolveAuthorName,
} from '../../../utils/authorUtils';

/**
 * Content rendering approach:
 * - Markdown: Uses ReactMarkdown library (when available, falls back to basic conversion)
 * - MDX: Uses MDXProvider and dynamic compilation (when available, falls back to markdown)
 * - HTML: Uses DOMPurify + dangerouslySetInnerHTML (when available, falls back to basic sanitization)
 * - Text: Rendered as plain text
 *
 * Format is auto-detected if not explicitly provided
 */

// Enhanced HTML sanitization for security
const sanitizeHtml = (html: string): string => {
  // Try to use DOMPurify if available
  try {
    // Dynamic import would go here when dependencies are available
    // const DOMPurify = require('dompurify');
    // return DOMPurify.sanitize(html, {
    //   ADD_ATTR: ['target', 'rel', 'class', 'id', 'style'],
    //   FORBID_TAGS: ['script', 'iframe'],
    //   FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    //   USE_PROFILES: { html: true },
    // });
  } catch (error) {
    console.warn(
      '[ContentRenderer] DOMPurify not available, using basic sanitization'
    );
  }

  // Fallback basic sanitization - remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '');
};

// Enhanced Markdown to HTML converter
const basicMarkdownToHtml = (markdown: string): string => {
  return (
    markdown
      // Code blocks
      .replace(
        /```([a-z]*)\n([\s\S]*?)\n```/gim,
        '<pre><code class="language-$1">$2</code></pre>'
      )
      // Inline code
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Headers
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/__(.*?)__/gim, '<strong>$1</strong>')
      .replace(/_(.*?)_/gim, '<em>$1</em>')
      // Strikethrough
      .replace(/~~(.*?)~~/gim, '<del>$1</del>')
      // Links and Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr />')
      // Lists (basic)
      .replace(/^[-*+] (.*)$/gim, '<li>$1</li>')
      .replace(/^(\d+)\. (.*)$/gim, '<li>$2</li>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br />')
  );
};

// Implementation of MDX component handler (placeholder for now)
const useMDXComponent = (mdxContent: string) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null
  );

  React.useEffect(() => {
    // Placeholder for MDX compilation
    // When @mdx-js/mdx is available, this would compile the MDX content
    const compileAndSetComponent = async () => {
      if (!mdxContent) {
        setComponent(() => () => null);
        return;
      }

      try {
        // TODO: Use the MDX compiler when available
        // const { compile } = await import('@mdx-js/mdx');
        // ... compilation logic ...

        // For now, fallback to basic markdown conversion
        // console.log('[ContentRenderer] MDX compiler not available, falling back to markdown');
        setComponent(() => () => {
          const htmlContent = basicMarkdownToHtml(mdxContent);
          return (
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContent) }}
            />
          );
        });
      } catch (error) {
        console.error('Error compiling MDX:', error);
        setComponent(() => () => {
          const htmlContent = basicMarkdownToHtml(mdxContent);
          return (
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContent) }}
            />
          );
        });
      }
    };

    compileAndSetComponent();
  }, [mdxContent]);

  return Component || (() => <div>Loading MDX content...</div>);
};

// ContentRenderer component to handle different content formats
const ContentRenderer: React.FC<{
  content: string;
  format?: 'markdown' | 'mdx' | 'html' | 'text';
  style?: React.CSSProperties;
  className?: string;
}> = ({ content, format, style, className }) => {
  const baseStyles: React.CSSProperties = {
    lineHeight: '1.6',
    ...style,
  };

  // Auto-detect the content format if not explicitly specified
  const detectedFormat = useContentFormatDetection(content);

  // Use explicitly provided format or detected format
  const contentFormat = format || detectedFormat;

  // Always call React hooks at the top level
  const MDXContentComponent = useMDXComponent(content);

  // Enhanced logging for debugging content format issues
  React.useEffect(() => {
    // Log debug information about content format (commented out to reduce noise)
    /* DEBUG LOGS
    // console.log(
      // `[ContentRenderer] Content format decision:
      // - Explicitly provided format: ${format || 'none'}
      // - Auto-detected format: ${detectedFormat}
      // - Final format being used: ${contentFormat}
      // - Content type check: ${typeof content}
      // - Content length: ${content?.length || 0} characters
      // `
    );
    */
  }, [format, detectedFormat, contentFormat, content]);

  switch (contentFormat) {
    case 'markdown':
      try {
        // Try to use ReactMarkdown if available, otherwise use basic conversion
        // TODO: Add ReactMarkdown when dependencies are available
        // return (
        //   <div style={baseStyles} className={`markdown-content ${className || ''}`}>
        //     <ReactMarkdown>{content}</ReactMarkdown>
        //   </div>
        // );

        const htmlContent = basicMarkdownToHtml(content);
        return (
          <div
            style={baseStyles}
            className={`markdown-content ${className || ''}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContent) }}
          />
        );
      } catch (error) {
        console.error(
          '[ContentRenderer] Error rendering Markdown content:',
          error
        );
        // Fallback to plain text if Markdown rendering fails
        return (
          <div
            style={{ ...baseStyles, whiteSpace: 'pre-wrap' }}
            className={`markdown-content-fallback ${className || ''}`}
          >
            {content}
          </div>
        );
      }
    case 'mdx': {
      try {
        // TODO: Use MDXProvider when available
        // return (
        //   <div style={baseStyles} className={`mdx-content ${className || ''}`}>
        //     <MDXProvider>
        //       {MDXContentComponent && <MDXContentComponent />}
        //     </MDXProvider>
        //   </div>
        // );

        return (
          <div style={baseStyles} className={`mdx-content ${className || ''}`}>
            {MDXContentComponent && <MDXContentComponent />}
          </div>
        );
      } catch (error) {
        console.error('[ContentRenderer] Error rendering MDX content:', error);
        // Fallback to markdown if MDX rendering fails
        const htmlContent = basicMarkdownToHtml(content);
        return (
          <div
            style={baseStyles}
            className={`mdx-content-fallback ${className || ''}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContent) }}
          />
        );
      }
    }
    case 'html': {
      // Ensure we're working with a string
      const htmlContent = typeof content === 'string' ? content : '';

      // Sanitize the HTML for security
      const sanitizedContent = sanitizeHtml(htmlContent);

      // If sanitizing removed everything meaningful, it might not be valid HTML
      const strippedHtml = sanitizedContent.replace(/<[^>]*>/g, '').trim();
      const hasActualContent = strippedHtml.length > 0;

      /* DEBUG LOG - Commented out to reduce console noise
      // console.log(`[ContentRenderer] HTML rendering: 
        // - Original content length: ${htmlContent.length} chars
        // - Sanitized content length: ${sanitizedContent.length} chars
        // - Content without HTML tags: ${strippedHtml.length} chars
      // `);
      */

      if (hasActualContent) {
        return (
          <div
            style={{ ...baseStyles, wordBreak: 'break-word' }}
            className={`html-content ${className || ''}`}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        );
      } else {
        // Fallback when there's no actual content
        return (
          <div
            style={{ ...baseStyles, wordBreak: 'break-word' }}
            className={`html-content ${className || ''}`}
          >
            <p>No HTML content to display</p>
          </div>
        );
      }
    }
    case 'text':
    default:
      // For plain text, preserve whitespace and line breaks
      return (
        <div
          style={{ ...baseStyles, whiteSpace: 'pre-wrap' }}
          className={`text-content ${className || ''}`}
        >
          {content}
        </div>
      );
  }
};

export interface ContentViewProps {
  post: any; // Replace 'any' with the actual type of post
  contentType?: string;
  allPosts?: ContentItem[];
  format?: 'markdown' | 'mdx' | 'html' | 'text'; // Content format specification (optional - will auto-detect if not provided)
}

export const ContentView: React.FC<ContentViewProps> = ({
  post,
  contentType = '',
  allPosts = [],
  format, // Don't set a default - let auto-detection work
}) => {
  // Debug log the props passed to ContentView
  React.useEffect(() => {
    /* DEBUG LOG - Commented out to reduce console noise
    // console.log('[ContentView] Props received:', {
      // postId: post?.id,
      // contentType,
      // format,
      // contentPreview: post?.content?.slice(0, 50),
    // });
    */
  }, [post, contentType, format]);
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { goBackToList } = useContentFilterStore();

  // Get navigation information
  const navigationInfo = getNavigationInfo(allPosts, post.id);
  const listButtonText = getListButtonText(contentType);
  const basePath = getBasePath(contentType);

  // Navigation handlers
  const handlePreviousPost = () => {
    if (navigationInfo.previousPost) {
      navigate(`${basePath}/${navigationInfo.previousPost.id}`);
    }
  };

  const handleNextPost = () => {
    if (navigationInfo.nextPost) {
      navigate(`${basePath}/${navigationInfo.nextPost.id}`);
    }
  };

  const handleBackToList = () => {
    goBackToList(navigate);
  };

  // Content container styles that apply the layout
  const contentContainerStyles = {
    maxWidth: isMobile ? '100%' : isTablet ? '600px' : '58dvw',
    margin: '0 auto',
    padding: theme.spacing.m,
    borderRadius: theme.effects.roundedCorner4,
  };

  // Individual content styles
  const contentViewStyles = {
    padding: isMobile ? theme.spacing.m : theme.spacing.xl,
    margin: isMobile ? '0' : theme.spacing.l,
    width: '100%',
  };

  /* DEBUG LOGS - Commented out to reduce console noise
  // console.log('[ContentView] Rendering post:', post);

  // Add debugging for author resolution
  // console.log(
    // '[ContentView] Author resolution debug:',
    // debugAuthorResolution(post)
  );
  */

  return (
    <Container style={contentContainerStyles}>
      <BaseCard
        style={contentViewStyles}
        elevation='medium'
        interactive={false}
        padding={isMobile ? theme.spacing.m : theme.spacing.xl}
      >
        <Typography
          variant='h2'
          fontSize={theme.typography.fontSizes.xl}
          color={theme.palette.themePrimary}
          style={{
            marginTop: isMobile ? theme.spacing.m : theme.spacing.s,
            marginBottom: isMobile ? theme.spacing.xxs : theme.spacing.s2,
          }}
        >
          {post.title}
        </Typography>
        {post.date && (
          <Typography
            variant='h5'
            fontSize={theme.typography.fontSizes.clamp4}
            color={theme.palette.themeTertiary}
            style={{
              marginBottom: isMobile ? 0 : theme.spacing.s,
              display: 'block',
            }}
          >
            {isDayjs(post.date)
              ? post.date.format('DD MMM, YYYY')
              : new Date(post.date)
                  .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                  .toLowerCase()}
          </Typography>
        )}
        <AuthorTagline
          isMobile={isMobile}
          author={resolveAuthorName(post)}
          tagline={post.tagline}
        />
        {post.description && (
          <>
            <Typography
              variant='p'
              fontSize={theme.typography.fontFamilies.base}
              color={theme.palette.neutralSecondary}
            >
              {post.description}
            </Typography>
            <hr />
          </>
        )}
        <ContentRenderer
          content={post.content}
          format={format} // Only pass the format if explicitly provided
          style={{
            color: theme.palette.neutralPrimary,
            margin: isMobile ? '0 0 1rem 0' : '1rem 0',
            fontFamily: theme.typography.fontFamilies.base,
          }}
        />
      </BaseCard>
      <Container
        padding={
          isMobile
            ? '1rem 0'
            : `0 calc(${theme.spacing.xl} + ${theme.spacing.l})`
        }
      >
        <Container
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          gap={theme.spacing.m}
          padding={isMobile ? '0' : `0 ${theme.spacing.xl} ${theme.spacing.l}`}
        >
          {/* Previous and Next buttons container */}
          <Container
            display='flex'
            gap={theme.spacing.s}
            justifyContent='flex-start'
            alignItems='center'
          >
            {navigationInfo.hasPrevious && (
              <FluentButton
                variant='secondary'
                size='small'
                onClick={handlePreviousPost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.s1,
                }}
              >
                <FluentIcon
                  iconName='ChevronLeft'
                  size='small'
                  color={theme.isInverted ? 'black' : 'white'}
                />
                <Typography
                  variant='h5'
                  fontSize={theme.typography.fontSizes.clamp4}
                  color={theme.semanticColors.bodyBackground}
                  padding='0.5rem'
                >
                  go back
                </Typography>
              </FluentButton>
            )}

            {navigationInfo.hasNext && (
              <FluentButton
                variant='secondary'
                size='small'
                onClick={handleNextPost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.s1,
                }}
              >
                <Typography
                  variant='h5'
                  fontSize={theme.typography.fontSizes.clamp4}
                  color={theme.semanticColors.bodyBackground}
                  padding='0.5rem'
                >
                  next entry
                </Typography>
                <FluentIcon
                  iconName='ChevronRight'
                  size='small'
                  color={theme.isInverted ? 'black' : 'white'}
                />
              </FluentButton>
            )}
          </Container>

          {/* Back to list button */}
          <FluentButton
            variant='secondary'
            size='small'
            onClick={handleBackToList}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s1,
              margin: '0 auto',
              minWidth: isMobile ? '150px' : '200px',
            }}
          >
            <Typography
              variant='h5'
              fontSize={theme.typography.fontSizes.clamp4}
              color={theme.semanticColors.bodyBackground}
              padding='0.5rem'
            >
              {listButtonText}
            </Typography>
          </FluentButton>
        </Container>
      </Container>
    </Container>
  );
};

export default ContentView;
