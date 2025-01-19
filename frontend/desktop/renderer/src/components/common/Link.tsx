import { useNavigate } from "@/public/navigation";
import { Link as MUILink, LinkProps as MUILinkProps } from "@mui/material";
import React from "react";

export interface LinkProps extends MUILinkProps {
  params?: any[];
}

export const Link: React.FC<LinkProps> = (props) => {
  const { href, params, onClick, ...other } = props;
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    onClick && onClick(event);
    if (href) {
      event.preventDefault();
      navigate(href, ...(params || []));
    }
  };

  return <MUILink href="" onClick={handleClick} {...other} />;
};
