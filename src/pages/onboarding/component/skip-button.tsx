import React from 'react';

import FluentButton from '../../../theme/components/button/button';

interface SkipButtonProps {
  skipOnboarding: () => void;
}

const SkipButton: React.FC<SkipButtonProps> = ({
  skipOnboarding,
}) => {
  return (
    <FluentButton
      size='large'
      variant='error'
      onClick={(e) => {
        e.stopPropagation(); // Prevents the parent div's onClick from firing
        skipOnboarding();
      }}
    >
      Skip and Go to Homepage
    </FluentButton>
  );
};

export default SkipButton;
