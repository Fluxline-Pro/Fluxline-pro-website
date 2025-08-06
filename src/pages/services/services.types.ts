interface IAboutContent {
  title: string;
  description: string;
  image: string;
}

interface IAboutPercentagePoint {
  name: string;
  percentage: number;
  description?: string;
}

interface IAboutBulletPoint {
  name: string;
  description: string;
  route?: string; // Optional route for navigation
}

export type { IAboutContent, IAboutPercentagePoint, IAboutBulletPoint };
