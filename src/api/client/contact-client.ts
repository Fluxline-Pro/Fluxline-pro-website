/**
 * ContactMe API Client
 * Handles contact form submission operations
 */

import { BaseApiClient } from './base-client';
import {
  ContactMeDTO,
  ContactResponse,
  ApiResponse,
  RequestOptions,
} from '../types';

export class ContactApiClient extends BaseApiClient {
  /**
   * Submit contact form
   * Endpoint: POST /contact
   */
  async submitContactForm(
    contactData: ContactMeDTO,
    options?: RequestOptions
  ): Promise<ApiResponse<ContactResponse>> {
    this.validateContactRequest(contactData);

    const endpoint = '/contact';
    return this.post<ContactResponse>(endpoint, contactData, options);
  }

  /**
   * Validate contact form request
   */
  private validateContactRequest(data: ContactMeDTO): void {
    // Required fields
    if (!data.name) {
      throw new Error('Name is required');
    }
    if (!data.email) {
      throw new Error('Email is required');
    }
    if (!data.message) {
      throw new Error('Message is required');
    }

    // Name validation
    if (data.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }

    // Email validation with basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      throw new Error('Please provide a valid email address');
    }

    // Message validation
    if (data.message.trim().length < 10) {
      throw new Error('Message must be at least 10 characters');
    }
  }
}
