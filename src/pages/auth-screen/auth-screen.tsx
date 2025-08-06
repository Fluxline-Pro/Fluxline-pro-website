import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AUTH_PASSWORD_HASH } from './constants';
import { verifyPassword } from './constants';

import FluentInput from '../../theme/components/form-elements/input/input';
import { FluentButton } from '../../theme/components/button/button';
import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import ProgressBar from '../../theme/components/progress-bar/progress-bar';

const AuthScreenContent = ({
  handleSubmit,
  password,
  setPassword,
  setStatusMessage,
  statusMessage,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  password: string;
  setPassword: (e: string) => void;
  setStatusMessage: (e: string) => void;
  statusMessage: string;
}) => {
  const handleInputChange = (e: string) => {
    setPassword(e);
    setStatusMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FluentInput
          label='Password'
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handleInputChange}
          placeholder='Enter password'
          errorMessage={statusMessage}
          style={{ marginBottom: '1rem' }}
        />
        <FluentButton type='submit' variant='primary'>
          Submit
        </FluentButton>
      </div>
    </form>
  );
};

const AuthScreen = () => {
  const [password, setPassword] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { setPreference } = useUserPreferencesStore();
  const navigate = useNavigate();

  // Set document title for auth screen
  React.useEffect(() => {
    document.title = 'TerenceWaters.com - Authentication';
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await verifyPassword(password, AUTH_PASSWORD_HASH);
    if (result) {
      setIsLoading(true);
      setStatusMessage('The password is correct');
      setPassword('');
      setPreference('isAuthenticated', true);
      localStorage.setItem('isAuthenticated', 'true');
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } else {
      setStatusMessage('Invalid password');
      setPreference('isAuthenticated', false);
      localStorage.removeItem('isAuthenticated');
    }
  };

  return (
    <ViewportGrid
      leftChildren={null}
      rightChildren={
        isLoading ? (
          <ProgressBar label='Navigating you to the home page...' />
        ) : (
          <AuthScreenContent
            handleSubmit={handleSubmit}
            setStatusMessage={setStatusMessage}
            password={password}
            setPassword={setPassword}
            statusMessage={statusMessage}
          />
        )
      }
    />
  );
};

export default AuthScreen;
