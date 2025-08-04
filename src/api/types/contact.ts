/**
 * ContactMe-related TypeScript types
 */

/**
 * ContactMe DTO for API requests
 * Maps to ContactMeDTO.cs in Azure Functions
 */
export interface ContactMeDTO {
  name: string; // Required, min 2 chars
  email: string; // Required, valid email format
  message: string; // Required, min 10 chars
}

/**
 * Contact Response model for API responses
 */
export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * Contact Error Response
 */
export interface ContactErrorResponse {
  errors: string[];
}
