import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";
import "./modal.css"

export const ModalHeader = styled.div<{ background?: string }>`  
  align-items: center;
  background: ${({ background }) => background || "transparent"};
  border-bottom: 1px solid  rgba(29, 29, 29, 0.1);
  display: flex;  
  padding: 12px 24px;  
  background-color: #1b2028 !important;
  color: white !important;
`;

// border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};

export const ModalTitle = styled(Flex)`    
  align-items: center;   
  flex: 1;
  background-color: #1b2028 !important;  
  color: white !important;
`;

export const ModalBody = styled(Flex)`  
  flex-direction: column;
  max-height: 90vh;
  // overflow-y: auto;
  background-color: #1b2028 !important;  
  color: white !important;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon  color="white" className="closeButton"  />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary"  />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: #1b2028 !important;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.01), 0px 12px 40px rgba(0, 0, 0, 0.02), 0px 8px 24px rgba(0, 0, 0, 0.02);
  border-radius: 20px;  
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};
  ${({ theme }) => theme.mediaQueries.xs} {

    width: auto;
    font-size: 48px !important;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;
