import React from "react";


export const MUIIcon = ({
  icon, alt,
}: {
  icon: { src: string; width: number; height: number; };
  alt: string;
}) => <img src={icon.src} width={icon.width} height={icon.height} alt={alt} />;
