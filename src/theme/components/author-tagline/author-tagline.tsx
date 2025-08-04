import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { Container } from '../../layouts/Container';
import { Typography } from '../typography/typography';
import { SocialLinks } from '../header/social-links';

export interface AuthorTaglineProps {
  author: string;
  tagline?: string;
  socialIcons?: React.ReactNode;
  isMobile?: boolean; // Optional prop to handle mobile-specific styles
}

export const AuthorTagline: React.FC<AuthorTaglineProps> = ({
  author,
  tagline,
  socialIcons,
  isMobile
}) => {
  const { theme } = useAppTheme();

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='flex-start'
      marginRight='0' // marginRight/Left/Bottom to be here for desktop to show left aligned
      marginLeft='0'
      marginBottom='0'
      padding='0'
      paddingLeft='0'
      paddingRight='0'
      gap={theme.spacing.xs}
      maxWidth={isMobile ? '100%' : '20dvw'}
    >
      <Typography
        variant='h5'
        fontSize={theme.typography.fontSizes.clamp4}
        color={theme.palette.themePrimary}
      >
        {author}
      </Typography>
      {tagline && (
        <Typography
          variant='p'
          fontSize={theme.typography.fontSizes.clamp3}
          color={theme.palette.themeSecondary}
        >
          {tagline}
        </Typography>
      )}
      {socialIcons ? <div>{socialIcons}</div> : <SocialLinks isAuthorTagline={true} />}
    </Container>
  );
};

export default AuthorTagline;
