import { NavItem } from './navigation.types';
import { FluentIcon } from '../fluent-icon/fluent-icon';

export const navItems: NavItem[] = [
  {
    label: 'home',
    path: '/',
    view: 'home',
    iconName: 'HomeSolid',
    icon: <FluentIcon iconName='HomeSolid' size='large' />,
  },
  {
    label: 'about',
    path: '/about',
    view: 'about',
    iconName: 'TextDocumentShared',
    icon: <FluentIcon iconName='TextDocumentShared' size='large' />,
  },
  {
    label: 'portfolio',
    path: '/portfolio',
    view: 'portfolio',
    iconName: 'FolderQuery',
    icon: <FluentIcon iconName='FolderQuery' size='large' />,
  },
  {
    label: 'blog',
    path: '/blog',
    view: 'blog',
    iconName: 'TextDocumentShared',
    icon: <FluentIcon iconName='TextDocumentShared' size='large' />,
  },
  {
    label: 'events',
    path: '/events',
    view: 'events',
    iconName: 'Calendar',
    icon: <FluentIcon iconName='Calendar' size='large' />,
  },
  {
    label: 'contact',
    path: '/contact',
    view: 'contact',
    iconName: 'PublicContactCard',
    icon: <FluentIcon iconName='PublicContactCard' size='large' />,
  },
];
