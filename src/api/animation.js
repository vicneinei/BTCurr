import { LayoutAnimation } from "react-native";

export const configureNextEaseAnim = () =>
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);