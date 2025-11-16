/**
 * Mock Email Service
 * Simulates sending emails for questionnaire submissions
 */

import { QuestionnaireAnswers } from '../store/store-specs/personalTrainingStore';

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

/**
 * Format questionnaire answers for email body
 */
const formatQuestionnaireForEmail = (data: QuestionnaireAnswers): string => {
  return `
=== Personal Training Questionnaire Submission ===

Contact Information:
- Name: ${data.contactName}
- Phone: ${data.contactPhone}
- Email: ${data.contactEmail}

Fitness Journey:
- Fitness Level: ${data.fitnessLevel || 'Not answered'}
- Last Workout: ${data.lastWorkoutTime || 'Not answered'}

Goals & Motivation:
- Fitness Goals: ${data.fitnessGoals.join(', ') || 'Not answered'}
- Motivation: ${data.motivation || 'Not answered'}
- Challenges: ${data.challenges.join(', ') || 'None'}

Lifestyle & Preferences:
- Workout Time: ${data.workoutTime || 'Not answered'}
- Workout Frequency: ${data.workoutFrequency || 'Not answered'}
- Workout Location: ${data.workoutLocation || 'Not answered'}
- Physical Considerations: ${data.physicalConsiderations.join(', ') || 'None'}
- Details: ${data.physicalConsiderationsDetails || 'None'}

Support & Accountability:
- Support Level: ${data.supportLevel || 'Not answered'}
- Accountability Methods: ${data.accountabilityMethods.join(', ') || 'Not answered'}
- Nutrition Interest: ${data.nutritionInterest || 'Not answered'}
- Wellness Areas: ${data.wellnessAreas.join(', ') || 'None'}

Investment & Format:
- Monthly Investment: ${data.monthlyInvestment || 'Not answered'}
- Training Format: ${data.trainingFormat || 'Not answered'}
- Payment Structure: ${data.paymentStructure || 'Not answered'}
- Start Timeline: ${data.startTimeline || 'Not answered'}

Submitted: ${new Date().toLocaleString()}
  `;
};

/**
 * Mock function to send questionnaire submission email
 * In production, this would use a service like SendGrid, Azure Communication Services, or similar
 */
export const sendQuestionnaireEmail = async (
  data: QuestionnaireAnswers,
  recipientEmail: string = 'terence@fluxline.pro'
): Promise<EmailResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  try {
    const emailBody = formatQuestionnaireForEmail(data);
    const mockMessageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('[Mock Email Service] Sending email to:', recipientEmail);
    console.log('[Mock Email Service] Email body:\n', emailBody);

    // In production, you would call an email API here
    // Example: await sendGridClient.send({ to, from, subject, text: emailBody })

    return {
      success: true,
      message: `Email sent successfully to ${recipientEmail}`,
      messageId: mockMessageId,
    };
  } catch (error) {
    console.error('[Mock Email Service] Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send email notification',
    };
  }
};

/**
 * Mock function to send confirmation email to user
 */
export const sendConfirmationEmail = async (
  userName: string,
  userEmail: string
): Promise<EmailResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockMessageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  console.log('[Mock Email Service] Sending confirmation to:', userEmail);

  return {
    success: true,
    message: `Confirmation email sent to ${userEmail}`,
    messageId: mockMessageId,
  };
};
