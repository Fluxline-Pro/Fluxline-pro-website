import React from 'react';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { injectGlobalScrollbarStyles } from '../theme/utils/scrollbarStyles';

const ScrollbarTest: React.FC = () => {
  const { theme } = useAppTheme();
  const scrollbarClassName = 'test-scrollbar';

  React.useEffect(() => {
    injectGlobalScrollbarStyles(theme, scrollbarClassName);
  }, [theme]);

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        backgroundColor: theme.palette.neutralLighter,
      }}
    >
      <h2>Scrollbar Styling Test</h2>
      <div
        className={scrollbarClassName}
        style={{
          height: '200px',
          width: '300px',
          overflowY: 'auto',
          padding: '10px',
          border: '1px solid #ddd',
          backgroundColor: theme.palette.white,
          marginTop: '10px',
        }}
      >
        <p>This is a test container with custom scrollbar styling.</p>
        <p>Current theme primary color: {theme.palette.themePrimary}</p>
        <p>Scroll down to see the custom scrollbar...</p>
        <div style={{ height: '500px', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
          <p>This content extends below the visible area to trigger scrollbar.</p>
          <p>The scrollbar should be:</p>
          <ul>
            <li>Thinner than default (8px width)</li>
            <li>Using theme primary color: {theme.palette.themePrimary}</li>
            <li>Transparent background</li>
            <li>No arrows/buttons</li>
            <li>Rounded corners</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScrollbarTest;