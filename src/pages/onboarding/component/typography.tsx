import { Typography } from '../../../theme/components/typography/typography';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';

const H1styles = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  const { theme, fontScale } = useAppTheme();
  const fontSize = `clamp(${3 * fontScale}rem, ${3 * fontScale}cqi, ${4 * fontScale}rem)`;
  return (
    <Typography
      variant='h1'
      textAlign='center'
      fontSize={fontSize}
      color={theme.palette.themePrimary}
      textShadow={theme.typography.textShadows.h2}
      marginBottom={`clamp(${1 * fontScale}rem, ${1 * fontScale}cqi, ${2 * fontScale}rem)`}
      className={className}
      noHyphens
    >
      {text}
    </Typography>
  );
};

const H3styles = ({
  className,
  text,
  marginBottom,
  textBold,
}: {
  className?: string;
  text: string;
  marginBottom?: string;
  textBold?: boolean;
}) => {
  const { theme, fontScale } = useAppTheme();
  const fontSize = `clamp(${1.5 * fontScale}rem, ${2 * fontScale}cqi, ${2.5 * fontScale}rem)`;
  return (
    <Typography
      variant='h5'
      textAlign='center'
      fontVariationSettings={
        textBold
          ? '"wght" 600, "wdth" 200, "slnt" 0'
          : '"wght" 300, "wdth" 200, "slnt" 0'
      }
      fontSize={fontSize}
      color={theme.palette.neutralPrimary}
      className={className}
      marginBottom={marginBottom}
      noHyphens
    >
      {text}
    </Typography>
  );
};

const H5styles = ({
  className,
  text,
  marginTop,
  marginBottom,
}: {
  className?: string;
  text: string;
  marginTop?: string;
  marginBottom?: string;
}) => {
  const { theme, fontScale } = useAppTheme();
  const fontSize = `clamp(${1 * fontScale}rem, ${1.7 * fontScale}cqi, ${2 * fontScale}rem)`;
  return (
    <Typography
      variant='h5'
      textAlign='center'
      fontWeight='200'
      fontVariationSettings='"wght" 300, "wdth" 200, "slnt" 0'
      fontSize={fontSize}
      color={theme.palette.neutralPrimary}
      className={className}
      marginTop={marginTop}
      marginBottom={marginBottom}
      noHyphens
    >
      {text}
    </Typography>
  );
};

export { H1styles, H3styles, H5styles };
