import { useCaseStudiesStore } from '../caseStudiesStore';

describe('CaseStudiesStore', () => {
  test('store initializes with mock data', () => {
    const store = useCaseStudiesStore.getState();
    
    expect(store.caseStudies).toBeDefined();
    expect(store.caseStudiesList.length).toBeGreaterThan(0);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe(null);
  });

  test('getAllCaseStudies returns all case studies', () => {
    const store = useCaseStudiesStore.getState();
    const allStudies = store.getAllCaseStudies();
    
    expect(Array.isArray(allStudies)).toBe(true);
    expect(allStudies.length).toBeGreaterThanOrEqual(6);
  });

  test('getFeaturedCaseStudies returns only featured studies', () => {
    const store = useCaseStudiesStore.getState();
    const featuredStudies = store.getFeaturedCaseStudies();
    
    expect(Array.isArray(featuredStudies)).toBe(true);
    expect(featuredStudies.length).toBeGreaterThan(0);
    expect(featuredStudies.every(study => study.isFeatured)).toBe(true);
  });

  test('getCaseStudy returns correct study by slug', () => {
    const store = useCaseStudiesStore.getState();
    const allStudies = store.getAllCaseStudies();
    
    if (allStudies.length > 0) {
      const firstStudy = allStudies[0];
      const retrievedStudy = store.getCaseStudy(firstStudy.slug);
      
      expect(retrievedStudy).toBeDefined();
      expect(retrievedStudy?.slug).toBe(firstStudy.slug);
      expect(retrievedStudy?.title).toBe(firstStudy.title);
    }
  });

  test('getCaseStudy returns null for non-existent slug', () => {
    const store = useCaseStudiesStore.getState();
    const study = store.getCaseStudy('non-existent-slug');
    
    expect(study).toBe(null);
  });

  test('each case study has required fields', () => {
    const store = useCaseStudiesStore.getState();
    const allStudies = store.getAllCaseStudies();
    
    allStudies.forEach(study => {
      expect(study.id).toBeDefined();
      expect(study.slug).toBeDefined();
      expect(study.title).toBeDefined();
      expect(study.client).toBeDefined();
      expect(study.description).toBeDefined();
      expect(Array.isArray(study.services)).toBe(true);
      expect(Array.isArray(study.technologies)).toBe(true);
      expect(study.results).toBeDefined();
      expect(study.challengeDescription).toBeDefined();
      expect(study.solutionDescription).toBeDefined();
      expect(typeof study.isFeatured).toBe('boolean');
      expect(study.date).toBeInstanceOf(Date);
      expect(study.category).toBeDefined();
    });
  });
});
