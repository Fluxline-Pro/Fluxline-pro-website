# Personal Training Questionnaire - Implementation Guide

## Overview

This implementation provides a comprehensive Personal Training onboarding questionnaire for fitness wellness lead capture. The questionnaire guides users through 7 screens to capture their fitness journey, goals, lifestyle preferences, and contact information, then provides personalized program recommendations.

## Architecture

### Directory Structure

```
src/
├── pages/onboarding/
│   ├── views/pt-questionnaire/
│   │   ├── welcome.tsx           # Entry point with overview
│   │   ├── fitness-journey.tsx   # Screen 1: Fitness level assessment
│   │   ├── goals.tsx             # Screen 2: Goals & motivation
│   │   ├── lifestyle.tsx         # Screen 3: Lifestyle preferences
│   │   ├── support.tsx           # Screen 4: Support preferences
│   │   ├── investment.tsx        # Screen 5: Budget & format
│   │   ├── contact.tsx           # Screen 6: Contact information
│   │   └── results.tsx           # Screen 7: Personalized results
│   └── component/pt-questionnaire/
│       ├── button-array.tsx      # Navigation buttons
│       ├── progress-indicator.tsx # Progress bar component
│       └── question-option.tsx   # Reusable option card
├── store/store-specs/
│   └── personalTrainingStore.ts  # Zustand store for state
└── services/
    ├── azureStorage.ts           # Mock Azure storage service
    ├── email.ts                  # Mock email service
    └── decisionEngine.ts         # Recommendation logic
```

## Features

### 1. State Management (Zustand)

The questionnaire uses Zustand for persistent state management:

```typescript
// All answers stored in personalTrainingStore
const { answers, setFitnessLevel, setFitnessGoals } = usePersonalTrainingStore();
```

**Persisted Data:**
- All questionnaire answers
- Contact information
- Submission status and timestamp

### 2. Screen Flow

**Welcome Screen** (`/onboarding/pt-questionnaire/welcome`)
- Overview of the questionnaire
- Expected duration (5-7 minutes)
- Key benefits highlighted

**Screen 1: Fitness Journey** (`/onboarding/pt-questionnaire/fitness-journey`)
- Q1: Current fitness level (5 options from beginner to advanced)
- Q2: Last workout routine (conditional, hidden for beginners)

**Screen 2: Goals & Motivation** (`/onboarding/pt-questionnaire/goals`)
- Q1: Main goals (multi-select, up to 3)
- Q2: Primary motivation (single select)
- Q3: Past challenges (optional multi-select)

**Screen 3: Lifestyle & Preferences** (`/onboarding/pt-questionnaire/lifestyle`)
- Q1: Available workout time
- Q2: Workout frequency
- Q3: Preferred location
- Q4: Physical considerations (multi-select with details field)

**Screen 4: Support & Accountability** (`/onboarding/pt-questionnaire/support`)
- Q1: Support level preference
- Q2: Accountability methods (multi-select)
- Q3: Nutrition interest
- Q4: Other wellness areas (optional)

**Screen 5: Investment & Format** (`/onboarding/pt-questionnaire/investment`)
- Q1: Monthly investment comfort level
- Q2: Training format (online, in-person, hybrid)
- Q3: Payment structure preference
- Q4: Start timeline

**Screen 6: Contact Information** (`/onboarding/pt-questionnaire/contact`)
- Full name (validated, min 2 characters)
- Phone number (validated format)
- Email address (validated format)

**Screen 7: Results** (`/onboarding/pt-questionnaire/results`)
- Personalized recommendations based on answers
- Top recommendation highlighted
- Alternative programs shown
- Next steps outlined
- Automatic submission to Azure and email

### 3. Decision Engine

The decision engine (`services/decisionEngine.ts`) analyzes questionnaire answers to recommend programs:

```typescript
const recommendations = generateRecommendations(answers);
```

**Scoring Criteria:**
- Fitness level match (25 points)
- Training format match (20 points)
- Budget match (20 points)
- Support level match (15 points)
- Workout frequency (10 points)
- Goals clarity (10 points)

**Bonus Scoring:**
- Community support preference
- Location preferences
- Beginner with high support needs

**Available Programs:**
1. 1-on-1 Premium Personal Training
2. Online Coaching Program
3. Hybrid Training Package
4. Group Training Sessions

### 4. Mock Services

#### Azure Storage (`services/azureStorage.ts`)

Simulates uploading questionnaire data to Azure Blob Storage:

```typescript
const result = await uploadQuestionnaireToAzure(answers);
// Mock blob URL: https://fluxlineprostore.blob.core.windows.net/questionnaires/...
```

#### Email Service (`services/email.ts`)

Simulates sending emails via SendGrid/Azure Communication Services:

```typescript
// Send to Terence
await sendQuestionnaireEmail(answers, 'terence@fluxline.pro');

// Send confirmation to user
await sendConfirmationEmail(userName, userEmail);
```

### 5. Responsive Design

All screens are responsive using:
- `useDeviceType()` hook for mobile/tablet/desktop detection
- Fluent UI theming via `useAppTheme()` hook
- CSS Grid and Flexbox for layouts
- Mobile-first approach with conditional rendering

### 6. Progress Tracking

Visual progress indicator on every screen showing:
- Current step number (e.g., "Step 3 of 7")
- Progress bar (percentage complete)
- Current step label (e.g., "Lifestyle")

### 7. Validation

**Contact Screen:**
- Name: Minimum 2 characters
- Phone: 10+ digits with flexible formatting
- Email: Standard email format validation

**Navigation:**
- "Continue" button disabled until required fields complete
- Back navigation always available
- Skip functionality not available (capture all data)

## UI Components

### QuestionOption

Reusable component for single-select and multi-select options:

```tsx
<QuestionOption
  icon="🌱"
  label="Complete Beginner"
  value="complete-beginner"
  isSelected={selected === 'complete-beginner'}
  onClick={() => handleSelect('complete-beginner')}
  multiSelect={false}
/>
```

**Features:**
- Checkbox/radio indicator
- Optional emoji icon
- Hover effects
- Theme-aware styling
- Multi-select mode

### ProgressIndicator

Shows questionnaire progress:

```tsx
<ProgressIndicator
  currentStep={3}
  totalSteps={7}
  stepLabels={['Journey', 'Goals', 'Lifestyle', ...]}
/>
```

### PTQuestionnaireButtonArray

Navigation buttons for questionnaire:

```tsx
<PTQuestionnaireButtonArray
  showBackButton={true}
  nextDisabled={!canProceed}
  currentStep='fitness-journey'
  onNext={handleNext}
/>
```

## Data Flow

```
User Input
    ↓
Local State (useState)
    ↓
Zustand Store (persisted)
    ↓
Contact Screen (validation)
    ↓
Results Screen (auto-submit)
    ↓
├─→ Decision Engine (recommendations)
├─→ Azure Storage (data upload)
└─→ Email Service (notifications)
```

## Integration Points

### Production Integration

To integrate with real services:

1. **Azure Storage**: Replace `uploadQuestionnaireToAzure` with `@azure/storage-blob`
2. **Email Service**: Replace `sendQuestionnaireEmail` with SendGrid or Azure Communication Services
3. **API Endpoints**: Add REST API endpoints for data submission
4. **Authentication**: Add user authentication if required

### Example Production Integration:

```typescript
// services/azureStorage.ts
import { BlobServiceClient } from '@azure/storage-blob';

export const uploadQuestionnaireToAzure = async (data: QuestionnaireAnswers) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient('questionnaires');
  const blobName = `${Date.now()}-${data.contactEmail}.json`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
  await blockBlobClient.upload(JSON.stringify(data), JSON.stringify(data).length);
  
  return {
    success: true,
    blobUrl: blockBlobClient.url,
  };
};
```

## Testing

### Manual Testing Checklist

- [ ] Navigate to `/onboarding/pt-questionnaire/welcome`
- [ ] Complete all 7 screens
- [ ] Verify progress indicator updates
- [ ] Test back/forward navigation
- [ ] Verify validation on contact screen
- [ ] Check recommendations on results screen
- [ ] Verify console logs for mock API calls
- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop viewport

### State Persistence

Test Zustand persistence:
1. Complete partial questionnaire
2. Refresh browser
3. Navigate back to questionnaire
4. Verify answers are retained

## Customization

### Adding New Questions

1. Add new type to `personalTrainingStore.ts`:
```typescript
export type NewQuestionType = 'option-1' | 'option-2';
```

2. Add to `QuestionnaireAnswers` interface:
```typescript
newQuestion: NewQuestionType | null;
```

3. Add setter action:
```typescript
setNewQuestion: (value: NewQuestionType) => void;
```

4. Create/update screen component with new question

### Modifying Decision Engine

Edit `services/decisionEngine.ts`:

```typescript
const calculateProgramScore = (answers, programCriteria) => {
  // Add new scoring logic
  if (answers.newCriteria === 'specific-value') {
    score += 10;
  }
  return score;
};
```

### Styling Customization

All styling uses Fluent UI theme from `useAppTheme()`:

```typescript
const { theme } = useAppTheme();
// Access: theme.palette.themePrimary, theme.palette.neutralLight, etc.
```

## Troubleshooting

### Issue: State not persisting
**Solution**: Check Zustand devtools and localStorage for 'personal-training-store'

### Issue: Validation errors not showing
**Solution**: Verify error states are set before rendering error messages

### Issue: Mock services not logging
**Solution**: Check browser console - all mock services log to console

## Future Enhancements

1. **Analytics Integration**: Track completion rates, drop-off points
2. **A/B Testing**: Test different question orders/wording
3. **Multi-language Support**: i18n integration
4. **Progress Saving**: Email link to resume later
5. **PDF Generation**: Generate personalized program PDF
6. **Calendar Integration**: Direct booking of first session
7. **Payment Integration**: Secure payment for sessions
8. **Video Introductions**: Add video content to welcome screen

## Support

For questions or issues:
- Check console logs for detailed error messages
- Review Zustand store state in browser DevTools
- Verify all mock services are functioning in console
- Check network requests when integrated with real APIs

---

**Implementation Date**: January 2025
**Version**: 1.0.0
**Status**: ✅ Complete and Ready for Testing
