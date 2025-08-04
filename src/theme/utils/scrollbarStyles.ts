import React from 'react';
import { IExtendedTheme } from '../theme';

/**
 * Creates custom scrollbar styles with transparent background and theme-aware colors
 * Compatible with Chromium, Webkit, Moz, and Opera-based browsers
 */
export const createScrollbarStyles = (theme: IExtendedTheme): React.CSSProperties => {
  const scrollbarColor = theme.palette.themePrimary;
  const scrollbarBackground = 'transparent';
  const scrollbarHoverColor = theme.palette.themeDark || theme.palette.themePrimary;
  
  return {
    // Modern scrollbar properties (Firefox)
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `${scrollbarColor} ${scrollbarBackground}`,
    
    // Webkit scrollbar properties (Chrome, Safari, Edge)
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
      backgroundColor: scrollbarBackground,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: scrollbarBackground,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollbarColor,
      borderRadius: '4px',
      border: 'none',
      minHeight: '24px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: scrollbarHoverColor,
    },
    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor: scrollbarHoverColor,
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: scrollbarBackground,
    },
    // Hide scrollbar arrows/buttons
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
  } as React.CSSProperties;
};

/**
 * Creates CSS string for custom scrollbar styles (for use with styled-components or emotion)
 * Compatible with Chromium, Webkit, Moz, and Opera-based browsers
 */
export const createScrollbarCSS = (theme: IExtendedTheme): string => {
  const scrollbarColor = theme.palette.themePrimary;
  const scrollbarBackground = 'transparent';
  const scrollbarHoverColor = theme.palette.themeDark || theme.palette.themePrimary;

  return `
    /* Modern scrollbar properties (Firefox) */
    scrollbar-width: thin;
    scrollbar-color: ${scrollbarColor} ${scrollbarBackground};
    
    /* Webkit scrollbar properties (Chrome, Safari, Edge, Opera) */
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: ${scrollbarBackground};
    }
    
    &::-webkit-scrollbar-track {
      background-color: ${scrollbarBackground};
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${scrollbarColor};
      border-radius: 4px;
      border: none;
      min-height: 24px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background-color: ${scrollbarHoverColor};
    }
    
    &::-webkit-scrollbar-thumb:active {
      background-color: ${scrollbarHoverColor};
    }
    
    &::-webkit-scrollbar-corner {
      background-color: ${scrollbarBackground};
    }
    
    /* Hide scrollbar arrows/buttons */
    &::-webkit-scrollbar-button {
      display: none;
    }
  `;
};

/**
 * Injects global scrollbar styles into the document head
 * This is useful for styling scrollbars that can't be styled via inline styles
 */
export const injectGlobalScrollbarStyles = (theme: IExtendedTheme, className: string): void => {
  const scrollbarColor = theme.palette.themePrimary;
  const scrollbarBackground = 'transparent';
  const scrollbarHoverColor = theme.palette.themeDark || theme.palette.themePrimary;

  const styleId = `scrollbar-styles-${className}`;
  
  // Remove existing styles if any
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    .${className} {
      /* Modern scrollbar properties (Firefox) */
      scrollbar-width: thin;
      scrollbar-color: ${scrollbarColor} ${scrollbarBackground};
    }
    
    .${className}::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: ${scrollbarBackground};
    }
    
    .${className}::-webkit-scrollbar-track {
      background-color: ${scrollbarBackground};
      border-radius: 4px;
    }
    
    .${className}::-webkit-scrollbar-thumb {
      background-color: ${scrollbarColor};
      border-radius: 4px;
      border: none;
      min-height: 24px;
    }
    
    .${className}::-webkit-scrollbar-thumb:hover {
      background-color: ${scrollbarHoverColor};
    }
    
    .${className}::-webkit-scrollbar-thumb:active {
      background-color: ${scrollbarHoverColor};
    }
    
    .${className}::-webkit-scrollbar-corner {
      background-color: ${scrollbarBackground};
    }
    
    .${className}::-webkit-scrollbar-button {
      display: none;
    }
  `;
  
  document.head.appendChild(style);
};