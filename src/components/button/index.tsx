import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  title: string;
};

export function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
