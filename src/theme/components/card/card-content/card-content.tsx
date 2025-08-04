import { Text, mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ContentCardProps {
  date?: string;
  title?: string;
  onClick?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  date,
  title,
  onClick,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const { shouldReduceMotion } = useReducedMotion();

  const cardClass = mergeStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.palette.white,
    borderRadius: theme.effects.roundedCorner2,
    boxShadow: theme.effects.elevation4,
    cursor: 'pointer',
    transition: shouldReduceMotion ? 'none' : 'box-shadow 0.3s ease',
    selectors: {
      '&:hover': shouldReduceMotion
        ? {}
        : {
            boxShadow: theme.effects.elevation8,
          },
    },
  });

  const titleClass = mergeStyles({
    fontSize: theme.fonts.xLarge.fontSize,
    fontWeight: theme.fonts.xLarge.fontWeight,
    color: theme.palette.neutralPrimary,
    textAlign: 'center',
    paddingTop: isMobile ? 0 : theme.spacing.s1,
    margin: 0,
  });

  const dateClass = mergeStyles({
    fontSize: theme.fonts.medium.fontSize,
    color: theme.palette.neutralSecondary,
    textAlign: 'center',
    margin: 0,
  });

  return (
    <div className={cardClass} onClick={onClick}>
      <Text className={titleClass}>{title || 'blog'}</Text>
      <Text className={dateClass}>
        {date || new Date().toLocaleDateString()}
      </Text>
    </div>
  );
};

export default ContentCard;
