import { BoxProps } from "../../components/Box";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export interface InjectedProps {
  onDismiss?: Handler;
  setSlippage?: (value: number | ((prevVar: number) => number)) => void;
}

export interface ModalProps extends InjectedProps, BoxProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
  minWidth?: string;
}
