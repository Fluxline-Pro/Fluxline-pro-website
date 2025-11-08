/**
 * Mock Email Service
 * Simulates sending emails for questionnaire submissions
 */

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

/**
 * Mock function to send email notifications
 * In production, this would integrate with an actual email service
 */
export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('[Mock Email Service] Email sent:', {
    to: payload.to,
    subject: payload.subject,
    from: payload.from || 'noreply@fluxline.pro',
    bodyPreview: payload.body.substring(0, 100) + '...',
  });

  // Simulate successful email send
  return true;
};

/**
 * Send questionnaire submission notification email
 */
export const sendQuestionnaireSubmissionEmail = async (
  userEmail: string,
  userName: string,
  questionnaireType: string
): Promise<boolean> => {
  const payload: EmailPayload = {
    to: userEmail,
    subject: `Thank you for completing the ${questionnaireType} questionnaire`,
    body: `
      Dear ${userName},

      Thank you for taking the time to complete our ${questionnaireType} questionnaire.
      We've received your responses and will review them carefully to provide you with 
      personalized recommendations.

      Our team will reach out to you shortly to discuss next steps.

      Best regards,
      The Fluxline Pro Team
    `,
  };

  return sendEmail(payload);
};

/**
 * Send admin notification about new questionnaire submission
 */
export const sendAdminNotificationEmail = async (
  userName: string,
  userEmail: string,
  questionnaireType: string
): Promise<boolean> => {
  const payload: EmailPayload = {
    to: 'admin@fluxline.pro',
    subject: `New ${questionnaireType} Questionnaire Submission`,
    body: `
      A new questionnaire has been submitted:

      Type: ${questionnaireType}
      User: ${userName}
      Email: ${userEmail}

      Please review the submission in the admin dashboard.
    `,
  };

  return sendEmail(payload);
};
