/**
 * Contact Store
 * Zustand store for managing contact form submissions
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ContactMeDTO } from '../../api/types';
import { getApiClient } from '../../api';
import { formatApiError } from '../../api/utils';

interface ContactState {
  // Form state
  formData: ContactMeDTO;

  // Loading and error states
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;

  // Submission history
  lastSubmission: {
    data: ContactMeDTO;
    timestamp: string;
    success: boolean;
  } | null;

  // Actions
  setFormData: (data: Partial<ContactMeDTO>) => void;
  resetForm: () => void;
  submitContactForm: () => Promise<boolean>;
  clearErrors: () => void;
  clearSubmissionStatus: () => void;
}

// Default empty form state
const defaultFormState: ContactMeDTO = {
  name: '',
  email: '',
  message: '',
};

export const useContactStore = create<ContactState>()(
  devtools(
    (set, get) => ({
      // Initial state
      formData: { ...defaultFormState },
      isSubmitting: false,
      submitSuccess: false,
      error: null,
      lastSubmission: null,

      // Actions
      setFormData: (data: Partial<ContactMeDTO>) => {
        set({
          formData: { ...get().formData, ...data },
        });
      },

      resetForm: () => {
        set({
          formData: { ...defaultFormState },
          error: null,
          submitSuccess: false,
        });
      },

      submitContactForm: async () => {
        const state = get();
        const { formData } = state;

        // Basic validation
        const validationErrors = validateContactForm(formData);
        if (validationErrors) {
          set({ error: validationErrors });
          return false;
        }

        set({ isSubmitting: true, error: null });

        try {
          const apiClient = getApiClient();
          const response = await apiClient.contact.submitContactForm(formData);

          if (response.success && response.data) {
            set({
              isSubmitting: false,
              submitSuccess: true,
              lastSubmission: {
                data: { ...formData },
                timestamp: new Date().toISOString(),
                success: true,
              },
            });
            return true;
          } else {
            set({
              isSubmitting: false,
              error: 'Submission failed',
              submitSuccess: false,
              lastSubmission: {
                data: { ...formData },
                timestamp: new Date().toISOString(),
                success: false,
              },
            });
            return false;
          }
        } catch (error) {
          set({
            isSubmitting: false,
            error: formatApiError(error),
            submitSuccess: false,
            lastSubmission: {
              data: { ...formData },
              timestamp: new Date().toISOString(),
              success: false,
            },
          });
          return false;
        }
      },

      clearErrors: () => {
        set({ error: null });
      },

      clearSubmissionStatus: () => {
        set({ submitSuccess: false });
      },
    }),
    { name: 'ContactStore' }
  )
);

/**
 * Validate contact form data
 */
function validateContactForm(data: ContactMeDTO): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name is required and must be at least 2 characters';
  }

  if (!data.email || !isValidEmail(data.email)) {
    return 'A valid email address is required';
  }

  if (!data.message || data.message.trim().length < 10) {
    return 'Message is required and must be at least 10 characters';
  }

  return null;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
