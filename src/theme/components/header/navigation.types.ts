import { FluentIconProps } from '../fluent-icon/fluent-icon';

export interface NavItem {
  label: string;
  path: string;
  view: string; 
  icon: React.ReactElement<FluentIconProps>;
  iconName: string;
}

export interface NavigationProps {
  onClose: () => void;
}

export interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface NavigationButtonsProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
  onThemeClick: () => void;
}
