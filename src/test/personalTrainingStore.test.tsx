/**
 * Personal Training Store Tests
 * Tests for the PT questionnaire Zustand store
 */

import { renderHook, act } from '@testing-library/react';
import { usePersonalTrainingStore } from '../store/store-specs/personalTrainingStore';

describe('Personal Training Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => usePersonalTrainingStore());
    act(() => {
      result.current.resetQuestionnaire();
    });
  });

  it('should initialize with empty answers', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    expect(result.current.answers.fitnessLevel).toBeNull();
    expect(result.current.answers.fitnessGoals).toEqual([]);
    expect(result.current.answers.contactName).toBe('');
    expect(result.current.isSubmitted).toBe(false);
  });

  it('should set fitness level', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setFitnessLevel('complete-beginner');
    });
    
    expect(result.current.answers.fitnessLevel).toBe('complete-beginner');
  });

  it('should set multiple fitness goals', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setFitnessGoals(['weight-management', 'building-strength']);
    });
    
    expect(result.current.answers.fitnessGoals).toHaveLength(2);
    expect(result.current.answers.fitnessGoals).toContain('weight-management');
    expect(result.current.answers.fitnessGoals).toContain('building-strength');
  });

  it('should set contact information', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setContactInfo('John Doe', '555-1234', 'john@example.com');
    });
    
    expect(result.current.answers.contactName).toBe('John Doe');
    expect(result.current.answers.contactPhone).toBe('555-1234');
    expect(result.current.answers.contactEmail).toBe('john@example.com');
  });

  it('should mark as submitted', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.markAsSubmitted();
    });
    
    expect(result.current.isSubmitted).toBe(true);
    expect(result.current.submittedAt).toBeTruthy();
  });

  it('should reset questionnaire', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    // Set some data
    act(() => {
      result.current.setFitnessLevel('regular-exerciser');
      result.current.setContactInfo('Jane Doe', '555-5678', 'jane@example.com');
      result.current.markAsSubmitted();
    });
    
    // Reset
    act(() => {
      result.current.resetQuestionnaire();
    });
    
    expect(result.current.answers.fitnessLevel).toBeNull();
    expect(result.current.answers.contactName).toBe('');
    expect(result.current.isSubmitted).toBe(false);
  });

  it('should handle all screen 1 data', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setFitnessLevel('some-experience');
      result.current.setLastWorkoutTime('2-4-weeks-ago');
    });
    
    expect(result.current.answers.fitnessLevel).toBe('some-experience');
    expect(result.current.answers.lastWorkoutTime).toBe('2-4-weeks-ago');
  });

  it('should handle all screen 2 data', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setFitnessGoals(['health-wellness', 'stress-management', 'more-energy']);
      result.current.setMotivation('feeling-strong');
      result.current.setChallenges(['time-constraints', 'inconsistent-motivation']);
    });
    
    expect(result.current.answers.fitnessGoals).toHaveLength(3);
    expect(result.current.answers.motivation).toBe('feeling-strong');
    expect(result.current.answers.challenges).toHaveLength(2);
  });

  it('should handle all screen 3 data', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setWorkoutTime('some-flexibility-30-45');
      result.current.setWorkoutFrequency('3x-per-week');
      result.current.setWorkoutLocation('home-only');
      result.current.setPhysicalConsiderations(['no-limitations']);
    });
    
    expect(result.current.answers.workoutTime).toBe('some-flexibility-30-45');
    expect(result.current.answers.workoutFrequency).toBe('3x-per-week');
    expect(result.current.answers.workoutLocation).toBe('home-only');
    expect(result.current.answers.physicalConsiderations).toContain('no-limitations');
  });

  it('should handle all screen 4 data', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setSupportLevel('regular-support-weekly');
      result.current.setAccountabilityMethods(['workout-tracking', 'progress-dashboard']);
      result.current.setNutritionInterest('basic-guidance');
      result.current.setWellnessAreas(['sleep-optimization', 'stress-management']);
    });
    
    expect(result.current.answers.supportLevel).toBe('regular-support-weekly');
    expect(result.current.answers.accountabilityMethods).toHaveLength(2);
    expect(result.current.answers.nutritionInterest).toBe('basic-guidance');
    expect(result.current.answers.wellnessAreas).toHaveLength(2);
  });

  it('should handle all screen 5 data', () => {
    const { result } = renderHook(() => usePersonalTrainingStore());
    
    act(() => {
      result.current.setMonthlyInvestment('150-250');
      result.current.setTrainingFormat('hybrid');
      result.current.setPaymentStructure('monthly-payments');
      result.current.setStartTimeline('next-1-2-weeks');
    });
    
    expect(result.current.answers.monthlyInvestment).toBe('150-250');
    expect(result.current.answers.trainingFormat).toBe('hybrid');
    expect(result.current.answers.paymentStructure).toBe('monthly-payments');
    expect(result.current.answers.startTimeline).toBe('next-1-2-weeks');
  });
});
