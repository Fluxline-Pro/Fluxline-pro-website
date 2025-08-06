import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../theme/layouts/Container';
import { Typography } from '../../theme/components/typography/typography';
import FluentButton from '../../theme/components/button/button';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import PageWrapper from '../page-wrapper/page-wrapper';

// H2Title component similar to Services page
const H2Title = ({
  name,
  style,
}: {
  name: string;
  style?: React.CSSProperties;
}) => {
  const { theme } = useAppTheme();

  return (
    <Typography
      variant='h2'
      textAlign='left'
      color={theme.palette.themePrimary}
      margin='1rem 0'
      fontSize={theme.typography.fontSizes.clamp7}
      fontVariationSettings='wght 400,wdth 300,slnt 0'
      style={style}
    >
      {name}
    </Typography>
  );
};

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useAppTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <PageWrapper>
      <Container
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <H2Title name="Page Not Found" />
        
        <Typography
          variant='p'
          color={theme.palette.neutralPrimary}
          fontSize={theme.typography.fontSizes.clamp4}
          marginBottom='2rem'
          lineHeight='1.6'
        >
          Sorry, we couldn't find what you were looking for. The page you're looking for doesn't exist or has been moved.
        </Typography>

        <FluentButton
          variant='primary'
          text='Go Home'
          onClick={handleGoHome}
          size='medium'
          style={{ alignSelf: 'flex-start' }}
        />
      </Container>
    </PageWrapper>
  );
};

export default NotFound;
