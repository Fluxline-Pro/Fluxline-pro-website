# Individual Path Questionnaire

This directory contains the implementation of the Individual Identity, Branding & Life Coaching Questionnaire for the Individual Path.

## Structure

```
questionnaire/
├── questionnaire.tsx              # Main questionnaire component with routing
├── views/                         # Individual screen components
│   ├── questionnaire-welcome.tsx
│   ├── questionnaire-client-type.tsx
│   ├── questionnaire-goals.tsx
│   ├── questionnaire-challenges.tsx
│   ├── questionnaire-motivation.tsx
│   ├── questionnaire-service-preferences.tsx
│   ├── questionnaire-investment.tsx
│   ├── questionnaire-contact-info.tsx
│   └── questionnaire-results.tsx
└── README.md                      # This file
```

## Flow

1. **Welcome** - Introduction and expectations
2. **Client Type** - Individual vs Organization selection
3. **Goals** - Select up to 3 primary goals
4. **Challenges** - Identify current challenges (multi-select)
5. **Assessment** - Motivation level and prior experience
6. **Service Preferences** - Preferred services, format, and frequency
7. **Investment** - Budget, timeline, and ROI expectations
8. **Contact Info** - Name, email, phone (required before results)
9. **Results** - Personalized package recommendations

## Features

- **Persistent State**: Answers are saved using Zustand with persistence
- **Responsive Design**: Uses Fluent UI theming and custom hooks
- **Progress Tracking**: Step indicator shows current progress
- **Decision Engine**: Intelligent package matching based on answers
- **Mock Services**: Email and Azure submission mocked for development
- **Empathetic UI**: Conversion-optimized with supportive messaging

## Store

The questionnaire state is managed by `individualPathStore.ts` which includes:
- Answer storage and validation
- Navigation flow control
- Package recommendation generation
- Backend submission handling

## Services

### Email Service (`src/services/email.ts`)
- Sends confirmation emails to users
- Sends admin notifications
- Currently mocked for development

### Azure Service (`src/services/azure.ts`)
- Submits questionnaire data to backend
- Generates submission IDs
- Currently mocked for development

## Usage

```typescript
import { useIndividualPathStore } from '@/store/store-specs/individualPathStore';

const MyComponent = () => {
  const { answers, setAnswer, nextStep } = useIndividualPathStore();
  
  // Use the store methods to interact with questionnaire state
};
```

## Accessing the Questionnaire

Navigate to `/questionnaire` to start the questionnaire flow.

## Future Enhancements

- Add analytics tracking
- Implement actual Azure backend integration
- Add email service integration
- Add PDF download of recommendations
- Implement booking system integration
