import * as React from "react";
import { TextProps, TextStyle } from "react-native";
export interface TextMoreProps extends TextProps {
  children: string;
  numberOfLines?: number;
  titleMore?: string;
  titleLess?: string;
  renderMore?: (onPress: () => void) => React.ReactNode;
  renderLess?: (onPress: () => void) => React.ReactNode;
  styleTextMore?: TextStyle;
  styleTextLess?: TextStyle;
}
declare const TextMore: React.FC<TextMoreProps>;
export default TextMore;
