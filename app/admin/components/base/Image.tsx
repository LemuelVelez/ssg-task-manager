import { Box, SxProps } from "@mui/material";
import { ImgHTMLAttributes } from "react";
import { StaticImageData } from "next/image"; // Import StaticImageData from next/image

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | StaticImageData; // Allow src to be either string or StaticImageData
  alt?: string;
  sx?: SxProps;
}

const Image = ({ src, alt, sx, ...rest }: ImageProps) => {
  const imageSrc =
    typeof src === "string" ? src : (src as StaticImageData)?.src; // Safely get the string URL

  return (
    <Box
      component="img"
      src={imageSrc} // Use the determined src
      alt={alt}
      sx={sx}
      {...rest}
    />
  );
};

export default Image;
