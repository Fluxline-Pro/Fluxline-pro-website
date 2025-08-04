import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { motion } from 'framer-motion';

import { LayoutGrid } from '../../layouts/LayoutGrid';
import { useAppTheme } from '../../hooks/useAppTheme';

interface FluentSpinnerProps {
  size?: SpinnerSize;
  label?: string;
  showLabel?: boolean;
}

const FluentSpinner: React.FC<FluentSpinnerProps> = ({
  size = SpinnerSize.large,
  label = 'Loading...',
  showLabel = false,
}) => {
  const { theme } = useAppTheme();

  const spinnerStyles = {
    color: theme.palette.themePrimary,
    fontSize: '4rem',
  };

  const labelStyles = {
    marginTop: theme.spacing.m,
    color: theme.palette.neutralPrimary,
    fontSize: theme.typography.fonts.medium.fontSize,
    fontFamily: theme.typography.fonts.medium.fontFamily,
  };

  return (
    <LayoutGrid
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
      flexDirection='column'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Spinner size={size} style={spinnerStyles} />
      </motion.div>
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          style={labelStyles}
        >
          {label}
        </motion.div>
      )}
    </LayoutGrid>
  );
};

export default FluentSpinner;
