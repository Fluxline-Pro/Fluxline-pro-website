import React from 'react';
import {
  DefaultButton,
  ContextualMenu,
  IContextualMenuItem,
  DirectionalHint,
  mergeStyles,
} from '@fluentui/react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import {
  useContentFilterStore,
  ContentViewType,
} from '../../../store/store-specs/contentFilterStore';

export const ContentPicker: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  // const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(
  //   null
  // );
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();

  const buttonRef = React.useRef<HTMLDivElement>(null);

  const getViewIcon = (view: ContentViewType): string => {
    switch (view) {
      case 'grid':
        return 'GridViewMedium';
      case 'small-tile':
        return 'List';
      case 'large-tile':
        return 'BulletedList';
      default:
        return 'GridViewMedium';
    }
  };

  const getViewLabel = (view: ContentViewType): string => {
    switch (view) {
      case 'grid':
        return 'grid';
      case 'small-tile':
        return 'small tile';
      case 'large-tile':
        return 'large tile';
      default:
        return 'grid';
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleViewChange = (newViewType: ContentViewType) => {
    setViewType(newViewType);
    setIsDropdownVisible(false);
  };

  const menuItems: IContextualMenuItem[] = [
    {
      key: 'grid',
      text: 'Grid',
      iconProps: { iconName: 'GridViewMedium' },
      onClick: () => handleViewChange('grid'),
      canCheck: true,
      checked: viewType === 'grid',
    },
    {
      key: 'small-tile',
      text: 'Small Tile',
      iconProps: { iconName: 'List' },
      onClick: () => handleViewChange('small-tile'),
      canCheck: true,
      checked: viewType === 'small-tile',
    },
    {
      key: 'large-tile',
      text: 'Large Tile',
      iconProps: { iconName: 'BulletedList' },
      onClick: () => handleViewChange('large-tile'),
      canCheck: true,
      checked: viewType === 'large-tile',
    },
  ];

  const buttonStyles = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.s,
    padding: `${theme.spacing.s} ${theme.spacing.m}`,
    borderRadius: 0,
    border: 'none',
    boxShadow: theme.shadows.button,
    backgroundColor: theme.semanticColors.bodyBackground,
    color: theme.palette.themePrimary,
    cursor: 'pointer',
    minWidth: '120px',
    height: '40px',
    fontSize: theme.typography.fonts.small.fontSize,
    textTransform: 'lowercase',
    ':hover': {
      backgroundColor: theme.palette.neutralQuaternary,
      borderColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.themePrimary,
    },
    ':focus': {
      outline: `2px solid ${theme.palette.themePrimary}`,
      outlineOffset: '2px',
    },
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div ref={buttonRef}>
        <DefaultButton className={buttonStyles} onClick={handleToggleDropdown}>
          <FluentIcon
            iconName={getViewIcon(viewType)}
            size='xSmall'
            color={theme.palette.themePrimary}
          />
          <span
            style={{
              flex: 1,
              textAlign: 'left',
              margin: `${0} ${theme.spacing.xs}`,
              fontFamily: theme.typography.fonts.small.fontFamily,
            }}
          >
            {getViewLabel(viewType)}
          </span>
          <FluentIcon
            iconName='ChevronDown'
            size='xSmall'
            color={theme.palette.neutralSecondary}
          />
        </DefaultButton>
      </div>

      {isDropdownVisible && (
        <ContextualMenu
          items={menuItems}
          target={buttonRef.current}
          onDismiss={() => setIsDropdownVisible(false)}
          directionalHint={DirectionalHint.bottomLeftEdge}
          gapSpace={4}
          styles={{
            root: {
              minWidth: buttonRef.current?.offsetWidth || 120,
            },
            container: {
              borderRadius: 0,
              border: `1px solid ${theme.palette.neutralLight}`,
            },
            list: {
              backgroundColor: theme.palette.white,
            },
          }}
        />
      )}
    </div>
  );
};

export default ContentPicker;
