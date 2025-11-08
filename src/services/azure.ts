/**
 * Mock Azure Service
 * Simulates posting data to Azure backend
 */

export interface AzureSubmissionPayload {
  questionnaireType: string;
  timestamp: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  answers: Record<string, any>;
}

export interface AzureSubmissionResponse {
  success: boolean;
  submissionId: string;
  message: string;
}

/**
 * Mock function to submit questionnaire data to Azure
 * In production, this would POST to an Azure Function or API endpoint
 */
export const submitToAzure = async (
  payload: AzureSubmissionPayload
): Promise<AzureSubmissionResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate mock submission ID
  const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  console.log('[Mock Azure Service] Data submitted:', {
    submissionId,
    questionnaireType: payload.questionnaireType,
    userEmail: payload.userInfo.email,
    timestamp: payload.timestamp,
    answersCount: Object.keys(payload.answers).length,
  });

  // Simulate successful submission
  return {
    success: true,
    submissionId,
    message: 'Questionnaire data successfully stored',
  };
};

/**
 * Mock function to retrieve submission by ID
 */
export const getSubmission = async (
  submissionId: string
): Promise<AzureSubmissionPayload | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('[Mock Azure Service] Retrieving submission:', submissionId);

  // In a real implementation, this would fetch from Azure storage
  return null;
};
