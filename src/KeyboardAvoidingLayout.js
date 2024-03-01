import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";

const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

const KeyboardAvoidingLayout = ({ children }) => (
  <KeyboardAvoidingView
    className="flex-1"
    behavior={behavior}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default KeyboardAvoidingLayout;