import React from 'react';
import { SocialIcon } from './social-icons.types';
import FacebookLogo from '../../../../assets/svgs/FacebookLogo';
import InstagramLogo from '../../../../assets/svgs/InstagramLogo';
import ThreadsLogo from '../../../../assets/svgs/ThreadsLogo';
import LinkedInLogo from '../../../../assets/svgs/LinkedInLogo';
import MicrosoftLogo from '../../../../assets/svgs/MicrosoftLogo';
import YouTubeLogo from '../../../../assets/svgs/YouTubeLogo';
import TiktokLogo from '../../../../assets/svgs/TiktokLogo';

export const getSocialIcons = (): SocialIcon[] => [
  {
    iconName: <FacebookLogo />,
    url: 'https://www.facebook.com/AplUSAndmINUS',
    tooltip: 'Facebook',
    isTagline: true,
  },
  {
    iconName: <InstagramLogo />,
    url: 'https://www.instagram.com/aplusandminus',
    tooltip: 'Instagram',
    isTagline: true,
  },
  {
    iconName: <ThreadsLogo />,
    url: 'https://www.threads.com/@aplusandminus',
    tooltip: 'Threads',
    isTagline: true,
  },
  {
    iconName: <LinkedInLogo />,
    url: 'https://www.linkedin.com/in/terencewaters',
    tooltip: 'LinkedIn',
    isTagline: true,
  },
  {
    iconName: <YouTubeLogo />,
    url: 'https://www.youtube.com/@terencewaters',
    tooltip: 'YouTube',
    isTagline: true,
  },
  {
    iconName: <TiktokLogo />,
    url: 'https://www.tiktok.com/@aplusandminus',
    tooltip: 'TikTok',
    isTagline: false,
  },
  {
    iconName: <MicrosoftLogo />,
    url: 'https://www.xbox.com/en-us/players/profile?player=AplUSAndmINUS',
    tooltip: 'Xbox',
    isTagline: false,
  },
];
