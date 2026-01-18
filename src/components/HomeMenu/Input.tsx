import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import Colors from "../../theme/colors";

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={Colors.textLight}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
});
