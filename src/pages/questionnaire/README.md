# Individual Path Questionnaire

This directory contains the implementation of the Individual Identity, Branding & Life Coaching Questionnaire for the Individual Path.

## 🎯 Quick Start

Navigate to `/questionnaire` to start the questionnaire flow.

## 📋 Structure

```
questionnaire/
├── questionnaire.tsx              # Main questionnaire component with routing
├── views/                         # Individual screen components
│   ├── questionnaire-welcome.tsx              # Introduction screen
│   ├── questionnaire-client-type.tsx          # Individual vs Organization
│   ├── questionnaire-goals.tsx                # Select up to 3 goals
│   ├── questionnaire-challenges.tsx           # Multi-select challenges
│   ├── questionnaire-motivation.tsx           # Motivation & experience
│   ├── questionnaire-service-preferences.tsx  # Services, format, frequency
│   ├── questionnaire-commitment.tsx           # Time & commitment level
│   ├── questionnaire-investment.tsx           # Budget & timeline
│   ├── questionnaire-contact-info.tsx         # Contact details (required)
│   └── questionnaire-results.tsx              # Recommendations & results
└── README.md                      # This file
```

## 🔄 Flow

1. **Welcome** - Introduction and expectations (⏱️ ~1 min)
2. **Client Type** - Individual vs Organization selection
3. **Goals** - Select up to 3 primary goals
4. **Challenges** - Identify current challenges (multi-select)
5. **Assessment** - Motivation level and prior experience
6. **Service Preferences** - Preferred services, format, and frequency
7. **Commitment & Lifestyle** - Available time, commitment level, obstacles, lifestyle
8. **Investment** - Budget, timeline, and ROI expectations
9. **Contact Info** - Name, email, phone (required before results) 🔒
10. **Results** - Personalized package recommendations 🎉

**Total Time:** ~5-7 minutes

## ✨ Features

### State Management
- **Persistent State**: All answers saved using Zustand with localStorage
- **Navigation Control**: Forward/backward navigation with progress tracking
- **Data Validation**: Required fields and format validation

### Decision Engine
The questionnaire uses an intelligent scoring system to recommend packages:

**Scoring Factors:**
- Goals selected (30-40 points each)
- Service preferences (40 points each)
- Commitment level (bonus points)
- Budget range (bonus points)

**Package Options:**
1. **Personal Branding Transformation** - $3,500-$5,000 (3 months)
2. **Life Transformation Coaching** - $2,000-$4,000 (3-6 months)
3. **Personal Training & Wellness** - $1,500-$3,000 (3 months)
4. **Complete Transformation Package** - $7,500+ (6-12 months)
5. **Discovery Session** - Complimentary (fallback)

### UI/UX
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Progress Tracking**: Visual step indicator
- **Empathetic Messaging**: Friendly, supportive copy with emojis
- **Conversion Optimized**: Social proof, security assurances, clear CTAs
- **Theme Aware**: Integrates with Fluent UI theming

### Services (Mocked)
- **Email Service**: User confirmation and admin notification emails
- **Azure Service**: Backend data submission with unique IDs
- **Console Logging**: Full visibility during development

## 🔧 Technical Details

### Store (`individualPathStore.ts`)

**State:**
```typescript
{
  answers: IndividualPathAnswers;     // All user answers
  currentStep: number;                 // Current step index
  completedSteps: number[];            // Completed step indices
  isSubmitting: boolean;               // Submission in progress
  submitSuccess: boolean;              // Submission completed
  submissionId: string | null;         // Backend submission ID
  error: string | null;                // Error messages
  recommendations: PackageRecommendation[];  // Generated packages
  selectedPackage: string | null;      // User selection
}
```

**Key Actions:**
- `setAnswer(key, value)` - Update any answer
- `addGoal(goal)` / `removeGoal(goal)` - Manage goals (max 3)
- `setContactInfo(info)` - Update contact details
- `nextStep()` / `previousStep()` - Navigate
- `submitQuestionnaire()` - Submit to backend
- `generateRecommendations()` - Run decision engine
- `resetQuestionnaire()` - Clear all data

### Usage Example

```typescript
import { useIndividualPathStore } from '@/store/store-specs/individualPathStore';

const MyComponent = () => {
  const { 
    answers, 
    setAnswer, 
    nextStep,
    recommendations,
    generateRecommendations
  } = useIndividualPathStore();
  
  // Access answers
  const goals = answers.goals;
  
  // Update answer
  setAnswer('motivation', 'committed');
  
  // Navigate
  nextStep();
  
  // Generate recommendations
  generateRecommendations();
};
```

## 🎨 Design Patterns

### Consistent Screen Structure
All screens follow this pattern:
```tsx
<Container display='flex' flexDirection='column' alignItems='center'>
  <H1styles text='Screen Title 🎯' />
  <H3styles text='Subtitle description' />
  
  {/* Content area with options */}
  <div style={{ maxWidth: '800px' }}>
    {/* Selection cards or form fields */}
  </div>
  
  <ButtonArray
    backButtonText='Previous'
    nextButtonText='Continue'
    nextDisabled={!isValid}
    onNext={handleNext}
    onBack={previousStep}
    currentView='questionnaire-screen-name'
    showSkipButton={false}
  />
</Container>
```

### Selection Cards
Interactive cards with:
- Border color indicates selection
- Background color on selection
- Emoji/icon for visual appeal
- Hover effects for interactivity
- Disabled state when appropriate

### Validation
- Client-side validation on Contact Info screen
- Required field checking before navigation
- Email format validation
- Phone number format validation
- Visual error messages

## 📊 Data Flow

```
User Input → Zustand Store → localStorage
                ↓
          Navigation Control
                ↓
         Contact Info Required
                ↓
         Generate Recommendations (Decision Engine)
                ↓
         Submit to Azure (Mock)
                ↓
         Send Emails (Mock)
                ↓
         Display Results
```

## 🔒 Security & Privacy

- All data stored locally until submission
- HTTPS required for production
- Contact info only required at end
- Clear privacy messaging
- No data shared without consent

## 🚀 Future Enhancements

**Phase 2 (Production):**
- [ ] Replace mock services with real Azure Functions
- [ ] Integrate actual email service (SendGrid/AWS SES)
- [ ] Add analytics tracking
- [ ] Implement PDF download
- [ ] Add booking system integration

**Phase 3 (Advanced):**
- [ ] Multi-language support
- [ ] Voice input for text fields
- [ ] Video testimonials
- [ ] A/B testing framework
- [ ] Automated follow-up sequences

## 📝 Testing

**Manual Testing Steps:**
1. Navigate to `/questionnaire`
2. Complete all steps
3. Try different answer combinations
4. Verify recommendations match expectations
5. Test on mobile, tablet, desktop
6. Refresh mid-flow to test persistence
7. Submit and check console logs
8. Test back navigation

**Type Safety:**
- ✅ TypeScript compilation passes
- ✅ All types properly defined
- ✅ No `any` types used

## 📚 Related Documentation

- **Implementation Summary**: `/IMPLEMENTATION_SUMMARY.md` - Complete technical details
- **Store Types**: `src/store/store-specs/individualPathStore.ts` - Type definitions
- **Services**: `src/services/` - Mock service implementations
- **Epic Issue**: GitHub Issue #16 - Original requirements

## 💡 Tips for Developers

1. **Testing Locally**: Check browser console for mock service logs
2. **Clearing Data**: Use `resetQuestionnaire()` or clear localStorage
3. **Customizing Packages**: Edit `calculateRecommendations()` function
4. **Adding Questions**: Create new screen, add route, update store
5. **Styling**: Use theme object from `useAppTheme()` hook

## 🆘 Troubleshooting

**Store not persisting:**
- Check localStorage is enabled
- Look for `individual-path-questionnaire` key
- Try clearing browser cache

**Navigation not working:**
- Verify route exists in `routes.tsx`
- Check route name in `constants.ts`
- Ensure `nextStep()`/`previousStep()` called

**Recommendations not showing:**
- Check if `generateRecommendations()` was called
- Verify scoring logic matches your answers
- Look at console logs for scoring breakdown

## 🎉 Success Criteria

✅ All screens implemented and functional
✅ State persistence working
✅ Navigation smooth and intuitive
✅ Recommendations relevant and helpful
✅ UI responsive on all devices
✅ Mock services logging correctly
✅ Type-safe throughout
✅ Follows existing patterns

---

**Questions or Issues?** Check the main implementation summary or reach out to the development team.

