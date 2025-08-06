import React from 'react';
import dayjs from 'dayjs';

import { useAppTheme } from '../../hooks/useAppTheme';
import { BaseCard } from '../../components/card/base-card/base-card';
import { Typography } from '../typography/typography';

interface ContentSquareProps {
  name: string;
  date: string | Date;
  onClick?: () => void;
  isComingSoon: boolean;
  isExternal?: boolean;
}

export const ContentSquare: React.FC<ContentSquareProps> = ({
  name,
  date,
  onClick,
  isComingSoon,
  isExternal = false,
}) => {
  const { theme } = useAppTheme();

  return (
    <BaseCard
      padding='2rem 1rem'
      onClick={onClick}
      elevation='medium'
      fullWidth
      style={{
        cursor: isComingSoon && !isExternal ? 'not-allowed' : 'pointer',
        backgroundColor:
          isComingSoon && !isExternal
            ? theme.palette.neutralTertiaryAlt
            : theme.semanticColors.bodyBackground,
        color: isComingSoon
          ? theme.palette.neutralPrimary
          : theme.palette.white,
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h2'
        fontSize='clamp(1.5rem, 1dvw, 2.5rem)'
        color={theme.palette.themePrimary}
        textAlign='center'
        marginBottom='1rem'
      >
        {name}
      </Typography>
      <Typography
        variant='h5'
        fontSize='clamp(0.825rem, 2vw, 1.25rem)'
        color={theme.palette.themeTertiary}
        textAlign='center'
        noHyphens
      >
        {isExternal ? (
          date === 'Coming Soon!' ? (
            <>
              coming soon!
              <br />
              click here to access
              <br />
              my github
            </>
          ) : (
            String(date)
          )
        ) : (
          dayjs(date).format('DD MMM, YYYY')
        )}
      </Typography>
    </BaseCard>
  );
};

export default ContentSquare;
