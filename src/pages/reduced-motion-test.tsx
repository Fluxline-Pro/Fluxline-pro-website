import React from 'react';
import { Text, PrimaryButton } from '@fluentui/react';
import { useReducedMotion } from '../theme/hooks/useReducedMotion';
import { useUserPreferencesStore } from '../store/store-specs/userPreferencesStore';
import {
  FadeSlideIn,
  FadeUp,
  FadeIn,
} from '../theme/components/animations/fade-animations';
import { BaseCard } from '../theme/components/card/base-card/base-card';
import { useAppTheme } from '../theme/hooks/useAppTheme';

export const ReducedMotionTestPage: React.FC = () => {
  const { shouldReduceMotion, userPreference, osPreference } =
    useReducedMotion();
  const { preferences, setPreference } = useUserPreferencesStore();
  const { theme } = useAppTheme();
  const [testKey, setTestKey] = React.useState(0);

  const handleToggleReducedMotion = () => {
    setPreference('reducedMotion', !preferences.reducedMotion);
  };

  const handleResetAnimations = () => {
    setTestKey((prev) => prev + 1);
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    section: {
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: theme.palette.neutralLighterAlt,
      borderRadius: '8px',
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '1rem',
      marginBottom: '1rem',
    },
    statusCard: {
      padding: '1rem',
      textAlign: 'center' as const,
      backgroundColor: theme.palette.white,
      borderRadius: '4px',
    },
    animationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '1rem',
    },
    testCard: {
      height: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <Text variant='xxLarge' as='h1' style={{ marginBottom: '2rem' }}>
        Reduced Motion Test Page
      </Text>

      {/* Status Section */}
      <div style={styles.section}>
        <Text variant='xLarge' as='h2' style={{ marginBottom: '1rem' }}>
          Current Status
        </Text>
        <div style={styles.statusGrid}>
          <div style={styles.statusCard}>
            <Text variant='medium' style={{ fontWeight: 'bold' }}>
              User Preference
            </Text>
            <Text
              variant='large'
              style={{
                color: userPreference
                  ? theme.palette.orange
                  : theme.palette.green,
                display: 'block',
                marginTop: '0.5rem',
              }}
            >
              {userPreference ? 'REDUCED' : 'NORMAL'}
            </Text>
          </div>
          <div style={styles.statusCard}>
            <Text variant='medium' style={{ fontWeight: 'bold' }}>
              OS Preference
            </Text>
            <Text
              variant='large'
              style={{
                color: osPreference
                  ? theme.palette.orange
                  : theme.palette.green,
                display: 'block',
                marginTop: '0.5rem',
              }}
            >
              {osPreference ? 'REDUCED' : 'NORMAL'}
            </Text>
          </div>
          <div style={styles.statusCard}>
            <Text variant='medium' style={{ fontWeight: 'bold' }}>
              Final Result
            </Text>
            <Text
              variant='large'
              style={{
                color: shouldReduceMotion
                  ? theme.palette.red
                  : theme.palette.green,
                display: 'block',
                marginTop: '0.5rem',
              }}
            >
              {shouldReduceMotion ? 'ANIMATIONS OFF' : 'ANIMATIONS ON'}
            </Text>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div style={styles.section}>
        <Text variant='xLarge' as='h2' style={{ marginBottom: '1rem' }}>
          Controls
        </Text>
        <div style={styles.buttonContainer}>
          <PrimaryButton
            text={`${preferences.reducedMotion ? 'Enable' : 'Disable'} Animations`}
            onClick={handleToggleReducedMotion}
          />
          <PrimaryButton
            text='Reset All Animations'
            onClick={handleResetAnimations}
          />
        </div>
        <Text variant='small' style={{ color: theme.palette.neutralSecondary }}>
          Toggle the setting above, then click "Reset All Animations" to see the
          difference.
          <br />
          You can also test OS-level preference by setting "Reduce motion" in
          your system accessibility settings.
        </Text>
      </div>

      {/* Animation Tests Section */}
      <div style={styles.section}>
        <Text variant='xLarge' as='h2' style={{ marginBottom: '1rem' }}>
          Animation Tests (Key: {testKey})
        </Text>
        <Text variant='medium' style={{ marginBottom: '1rem' }}>
          These animations should be{' '}
          {shouldReduceMotion ? 'disabled' : 'enabled'}:
        </Text>

        <div style={styles.animationGrid}>
          <FadeSlideIn
            key={`slide-right-${testKey}`}
            direction='right'
            delay={0}
          >
            <BaseCard style={styles.testCard}>
              <Text>Slide Right</Text>
            </BaseCard>
          </FadeSlideIn>

          <FadeSlideIn
            key={`slide-left-${testKey}`}
            direction='left'
            delay={0.1}
          >
            <BaseCard style={styles.testCard}>
              <Text>Slide Left</Text>
            </BaseCard>
          </FadeSlideIn>

          <FadeSlideIn
            key={`slide-bottom-${testKey}`}
            direction='bottom'
            delay={0.2}
          >
            <BaseCard style={styles.testCard}>
              <Text>Slide Bottom</Text>
            </BaseCard>
          </FadeSlideIn>

          <FadeSlideIn key={`slide-top-${testKey}`} direction='top' delay={0.3}>
            <BaseCard style={styles.testCard}>
              <Text>Slide Top</Text>
            </BaseCard>
          </FadeSlideIn>

          <FadeUp key={`fade-up-${testKey}`} delay={0.4}>
            <BaseCard style={styles.testCard}>
              <Text>Fade Up</Text>
            </BaseCard>
          </FadeUp>

          <FadeIn key={`fade-in-${testKey}`} delay={0.5}>
            <BaseCard style={styles.testCard}>
              <Text>Fade In</Text>
            </BaseCard>
          </FadeIn>
        </div>
      </div>

      {/* Information Section */}
      <div style={styles.section}>
        <Text variant='xLarge' as='h2' style={{ marginBottom: '1rem' }}>
          Implementation Details
        </Text>
        <Text variant='medium' as='div'>
          <strong>What's been updated:</strong>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>All Framer Motion animations (FadeSlideIn, FadeUp, FadeIn)</li>
            <li>CSS transitions in BaseCard components</li>
            <li>Onboarding typing animations</li>
            <li>CSS transitions and transforms in SCSS files</li>
            <li>Global CSS media queries for OS-level preferences</li>
          </ul>

          <strong>How it works:</strong>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>Checks both user preference AND OS preference</li>
            <li>If either is set to reduce motion, animations are disabled</li>
            <li>Animations start at their final position with 0 duration</li>
            <li>CSS transitions are set to 'none'</li>
            <li>Transforms and other effects are neutralized</li>
          </ul>
        </Text>
      </div>
    </div>
  );
};
