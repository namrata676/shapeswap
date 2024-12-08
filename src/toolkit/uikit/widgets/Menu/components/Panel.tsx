import React from "react";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
}

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu } = props;
  return (
  <div/>
  );
};

export default Panel;
