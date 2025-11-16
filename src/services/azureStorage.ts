/**
 * Mock Azure Storage Service
 * Simulates Azure Blob Storage for questionnaire data
 */

import { QuestionnaireAnswers } from '../store/store-specs/personalTrainingStore';

export interface AzureStorageResponse {
  success: boolean;
  message: string;
  blobUrl?: string;
  timestamp?: number;
}

/**
 * Mock function to upload questionnaire data to Azure Blob Storage
 * In production, this would use @azure/storage-blob
 */
export const uploadQuestionnaireToAzure = async (
  data: QuestionnaireAnswers
): Promise<AzureStorageResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    // Mock validation
    if (!data.contactName || !data.contactEmail) {
      return {
        success: false,
        message: 'Contact information is required',
      };
    }

    // Simulate successful upload
    const mockBlobUrl = `https://fluxlineprostore.blob.core.windows.net/questionnaires/${Date.now()}-${data.contactEmail}.json`;
    
    console.log('[Mock Azure Storage] Uploading questionnaire data:', {
      name: data.contactName,
      email: data.contactEmail,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Questionnaire data uploaded successfully',
      blobUrl: mockBlobUrl,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('[Mock Azure Storage] Upload failed:', error);
    return {
      success: false,
      message: 'Failed to upload questionnaire data',
    };
  }
};

/**
 * Mock function to retrieve questionnaire data from Azure Blob Storage
 */
export const getQuestionnaireFromAzure = async (
  blobUrl: string
): Promise<{ success: boolean; data?: QuestionnaireAnswers; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('[Mock Azure Storage] Retrieving questionnaire data from:', blobUrl);

  return {
    success: true,
    message: 'This is a mock service - data retrieval not implemented',
  };
};
