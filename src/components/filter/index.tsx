import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { StatusIcon } from "../statusIcon";
import { FilterStatus } from "@/@types/filterStatus";

import { styles } from "./styles";

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.7}
      {...rest}
    >
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
