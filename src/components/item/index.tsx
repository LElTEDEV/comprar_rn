import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { FilterStatus } from "@/@types/filterStatus";
import { StatusIcon } from "../statusIcon";
import { Trash2 } from "lucide-react-native";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type ItemProps = {
  data: ItemData;
  onRemove: () => void;
  onStatus: () => void;
};

export function Item({ data, onRemove, onStatus }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.descriprion}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Trash2 size={18} color="#828282" onPress={onRemove} />
      </TouchableOpacity>
    </View>
  );
}
