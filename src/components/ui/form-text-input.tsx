import React from "react";
import { Text, TextInput, TextInputProps } from "react-native";

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type FormTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  success?: string;
  className?: string;
};

export function FormTextInput({
  label,
  error,
  success,
  className = "",
  ...props
}: FormTextInputProps) {
  return (
    <ThemedView className="gap-1">
      {label ? (
        <ThemedText type="small" className="text-[12px] font-medium">
          {label}
        </ThemedText>
      ) : null}
      <TextInput
        {...props}
        className={`bg-gray-100 dark:bg-gray-800 rounded-md px-4 py-4  ${className}`.trim()}
      />
      {error && <Text className="text-red-500">{error}</Text>}
      {success && <Text className="text-green-500">{success}</Text>}
    </ThemedView>
  );
}
