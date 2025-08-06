// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { ContactMe } from '../pages/contact-me/contact-me';
// import { useContactStore } from '../store/store-specs/contactStore';

// // Mock the Zustand store
// jest.mock('../store/store-specs/contactStore');

// // Mock the content data manager
// jest.mock('../utils/contentDataManager', () => ({
//   CONTENT_API_FLAGS: {
//     contact: true,
//   },
//   isApiAvailable: jest.fn(() => true),
// }));

// // Mock the theme hook
// jest.mock('../../theme/hooks/useAppTheme', () => ({
//   useAppTheme: () => ({
//     theme: {
//       palette: {
//         themePrimary: '#0078d4',
//         neutralPrimary: '#323130',
//         neutralTertiary: '#605e5c',
//         red: '#d13438',
//         green: '#107c10',
//         orange: '#ff8c00',
//         redLight: '#fef7f7',
//         greenLight: '#f3f9f1',
//       },
//       typography: {
//         fontSizes: {
//           clamp7: '2rem',
//           small: '0.75rem',
//         },
//         fonts: {
//           body: {
//             fontFamily: 'Segoe UI',
//             fontVariationSettings: 'normal',
//           },
//           medium: {
//             fontSize: '14px',
//             fontWeight: '400',
//           },
//           h4: {
//             fontSize: '16px',
//           },
//         },
//         letterSpacing: {
//           normal: '0.02em',
//         },
//         lineHeights: {
//           tight: '1.2',
//         },
//       },
//       spacing: {
//         m: '16px',
//         s: '8px',
//         s1: '4px',
//         l1: '24px',
//       },
//       borderRadius: {
//         container: {
//           button: '4px',
//         },
//       },
//       semanticColors: {
//         bodyBackground: '#ffffff',
//       },
//       themeMode: 'light',
//     },
//   }),
// }));

// // Mock components that might not be available in test environment
// jest.mock('../../theme/components/button/bookings-button/bookings-button', () => ({
//   BookingsButton: () => <div>Bookings Button</div>,
// }));

// jest.mock('../../theme/layouts/Container', () => ({
//   Container: ({ children, ...props }: any) => <div {...props}>{children}</div>,
// }));

// jest.mock('../../theme/components/typography/typography', () => ({
//   Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
// }));

// jest.mock('../../theme/components/form-elements/input/input', () => ({
//   FluentInput: ({ label, value, onChange, error, errorMessage, required, ...props }: any) => (
//     <div>
//       <label>{label}{required && ' *'}</label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         data-testid={`input-${label}`}
//         style={{ borderColor: error ? 'red' : 'inherit' }}
//         {...props}
//       />
//       {error && errorMessage && <div data-testid={`error-${label}`}>{errorMessage}</div>}
//     </div>
//   ),
// }));

// jest.mock('../../theme/components/button/button', () => ({
//   FluentButton: ({ children, disabled, ...props }: any) => (
//     <button disabled={disabled} {...props}>
//       {children}
//     </button>
//   ),
// }));

// describe('ContactMe Component', () => {
//   const mockContactStore = {
//     formData: {
//       name: '',
//       email: '',
//       message: '',
//     },
//     isSubmitting: false,
//     submitSuccess: false,
//     error: null,
//     setFormData: jest.fn(),
//     submitContactForm: jest.fn(),
//     resetForm: jest.fn(),
//     clearErrors: jest.fn(),
//     clearSubmissionStatus: jest.fn(),
//   };

//   beforeEach(() => {
//     (useContactStore as jest.Mock).mockReturnValue(mockContactStore);
//     jest.clearAllMocks();
//   });

//   test('renders contact form with all required fields', () => {
//     render(<ContactMe />);

//     expect(screen.getByTestId('input-name')).toBeInTheDocument();
//     expect(screen.getByTestId('input-email')).toBeInTheDocument();
//     expect(screen.getByTestId('input-message')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
//   });

//   test('shows validation errors for empty fields on submit', async () => {
//     const user = userEvent.setup();
//     render(<ContactMe />);

//     const submitButton = screen.getByRole('button', { name: /send/i });
//     await user.click(submitButton);

//     // Should show validation errors
//     expect(screen.getByTestId('error-name')).toHaveTextContent(
//       'Name is required and must be at least 2 characters'
//     );
//     expect(screen.getByTestId('error-email')).toHaveTextContent('Email is required');
//     expect(screen.getByTestId('error-message')).toHaveTextContent(
//       'Message is required and must be at least 10 characters'
//     );
//   });

//   test('shows email validation error for invalid email format', async () => {
//     const user = userEvent.setup();
//     render(<ContactMe />);

//     const emailInput = screen.getByTestId('input-email');
//     const submitButton = screen.getByRole('button', { name: /send/i });

//     await user.type(emailInput, 'invalid-email');
//     await user.click(submitButton);

//     expect(screen.getByTestId('error-email')).toHaveTextContent(
//       'Please enter a valid email address'
//     );
//   });

//   test('updates form data when user types in fields', async () => {
//     const user = userEvent.setup();
//     render(<ContactMe />);

//     const nameInput = screen.getByTestId('input-name');
//     const emailInput = screen.getByTestId('input-email');
//     const messageInput = screen.getByTestId('input-message');

//     await user.type(nameInput, 'John Doe');
//     await user.type(emailInput, 'john@example.com');
//     await user.type(messageInput, 'This is a test message');

//     expect(mockContactStore.setFormData).toHaveBeenCalledWith({ name: 'J' });
//     expect(mockContactStore.setFormData).toHaveBeenCalledWith({ email: 'j' });
//     expect(mockContactStore.setFormData).toHaveBeenCalledWith({ message: 'T' });
//   });

//   test('submits form successfully with valid data', async () => {
//     const user = userEvent.setup();
//     mockContactStore.formData = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       message: 'This is a test message with more than 10 characters',
//     };
//     mockContactStore.submitContactForm.mockResolvedValue(true);

//     render(<ContactMe />);

//     const submitButton = screen.getByRole('button', { name: /send/i });
//     await user.click(submitButton);

//     expect(mockContactStore.submitContactForm).toHaveBeenCalled();
//   });

//   test('shows loading state during form submission', () => {
//     mockContactStore.isSubmitting = true;

//     render(<ContactMe />);

//     const submitButton = screen.getByRole('button', { name: /sending.../i });
//     expect(submitButton).toBeDisabled();
//   });

//   test('shows success message after successful submission', () => {
//     mockContactStore.submitSuccess = true;

//     render(<ContactMe />);

//     expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
//   });

//   test('shows error message when submission fails', () => {
//     mockContactStore.error = 'Network error occurred';

//     render(<ContactMe />);

//     expect(screen.getByText(/network error occurred/i)).toBeInTheDocument();
//   });

//   test('clears errors when user starts typing', async () => {
//     const user = userEvent.setup();
//     render(<ContactMe />);

//     const nameInput = screen.getByTestId('input-name');
//     await user.type(nameInput, 'J');

//     expect(mockContactStore.clearErrors).toHaveBeenCalled();
//   });

//   test('validates name field requires at least 2 characters', async () => {
//     const user = userEvent.setup();
//     render(<ContactMe />);

//     const nameInput = screen.getByTestId('input-name');
//     const submitButton = screen.getByRole('button', { name: /send/i });

//     await user.type(nameInput, 'J');
//     await user.click(submitButton);

//     expect(screen.getByTestId('error-name')).toHaveTextContent(
//       'Name is required and must be at least 2 characters'
//     );
//   });

//   test('validates message field requires at least 10 characters', async () => {
//     const user = userEvent.setup();
//     render(<ContactMe />);

//     const messageInput = screen.getByTestId('input-message');
//     const submitButton = screen.getByRole('button', { name: /send/i });

//     await user.type(messageInput, 'Short');
//     await user.click(submitButton);

//     expect(screen.getByTestId('error-message')).toHaveTextContent(
//       'Message is required and must be at least 10 characters'
//     );
//   });

//   test('accepts valid form data', async () => {
//     const user = userEvent.setup();
//     mockContactStore.formData = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       message: 'This is a valid message with more than 10 characters',
//     };
//     mockContactStore.submitContactForm.mockResolvedValue(true);

//     render(<ContactMe />);

//     const submitButton = screen.getByRole('button', { name: /send/i });
//     await user.click(submitButton);

//     // Should not show any validation errors
//     expect(screen.queryByTestId('error-name')).not.toBeInTheDocument();
//     expect(screen.queryByTestId('error-email')).not.toBeInTheDocument();
//     expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

//     expect(mockContactStore.submitContactForm).toHaveBeenCalled();
//   });
// });