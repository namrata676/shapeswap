import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";
import "./SlippageModal.css";

export const ModalHeader = styled.div<{ background?: string }>`  
  align-items: center;
  background: ${({ background }) => background || "transparent"};
  
  display: flex;  
  padding: 12px 24px;  
  padding-bottom: 1px !important;
  background-color: #1b2028 !important;
  color: white !important;
`;

// border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};

export const ModalTitle = styled(Flex)`    
  align-items: center;   
  flex: 1;
  color: white !important;

`;

export const TokenModalBody = styled(Flex)`  
  flex-direction: column;
  max-height: 90vh;
  // overflow-y: auto;
  background-color: #1b2028 !important;
  color: white !important;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <IconButton className="closeButton" variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="white" className="closeButton"/>
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: white;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);  
  border-radius: 16px;  
  max-width: 35% ;
  max-height: 90vh;
  z-index: ${({ theme }) => theme.zIndices.modal};
  ${({ theme }) => theme.mediaQueries.xs} {

    width: auto;
    font-size: 48px !important;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;
