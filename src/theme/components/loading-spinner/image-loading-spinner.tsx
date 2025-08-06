import React from 'react';
import { motion } from 'framer-motion';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

import { useAppTheme } from '../../hooks/useAppTheme';

interface ImageLoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
  showLabel?: boolean;
}

export const ImageLoadingSpinner: React.FC<ImageLoadingSpinnerProps> = ({
  size = 'medium',
  label = 'Loading image...',
  showLabel = false,
}) => {
  const { theme } = useAppTheme();

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          spinnerSize: SpinnerSize.medium,
          fontSize: '2rem',
          labelSize: theme.typography.fonts.small.fontSize,
        };
      case 'large':
        return {
          spinnerSize: SpinnerSize.large,
          fontSize: '5rem',
          labelSize: theme.typography.fonts.large.fontSize,
        };
      case 'medium':
      default:
        return {
          spinnerSize: SpinnerSize.large,
          fontSize: '3.5rem',
          labelSize: theme.typography.fonts.medium.fontSize,
        };
    }
  };

  const sizeConfig = getSizeConfig();

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.neutralLighter,
    borderRadius: theme.effects.roundedCorner2,
    gap: theme.spacing.s1,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const spinnerStyles = {
    color: theme.palette.themePrimary,
    fontSize: sizeConfig.fontSize,
  };

  const labelStyles = {
    color: theme.palette.neutralPrimary,
    fontSize: sizeConfig.labelSize,
    fontFamily: theme.typography.fonts.medium.fontFamily,
    textAlign: 'center' as const,
    marginTop: theme.spacing.s1,
  };

  // Background pulse animation
  const pulseAnimation = {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <motion.div
      style={containerStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background pulse effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${theme.palette.neutralLight}, ${theme.palette.neutralLighter})`,
          borderRadius: 'inherit',
        }}
        animate={pulseAnimation}
      />

      {/* Spinner */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Spinner size={sizeConfig.spinnerSize} style={spinnerStyles} />
      </motion.div>

      {/* Label */}
      {showLabel && (
        <motion.div
          style={{ ...labelStyles, position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageLoadingSpinner;
