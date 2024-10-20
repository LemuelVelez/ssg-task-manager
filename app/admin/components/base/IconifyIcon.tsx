import { Box, BoxProps } from "@mui/material";
import { Icon, IconProps } from "@iconify/react";

interface IconifyProps extends BoxProps {
  icon: IconProps["icon"];
  width?: number | string;
  height?: number | string;
}

const IconifyIcon = ({ icon, width, height, ...rest }: IconifyProps) => {
  return (
    <Box {...rest}>
      <Icon icon={icon} width={width} height={height} />
    </Box>
  );
};

export default IconifyIcon;
