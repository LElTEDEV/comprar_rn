import { Image, Text, TouchableOpacity, View } from "react-native";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Filter } from "@/components/filter";
import { FilterStatus } from "@/@types/filterStatus";

import { styles } from "./styles";
import { useState } from "react";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [activeFilter, setActiveFilter] = useState(FilterStatus.PENDING);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === activeFilter}
              onPress={() => setActiveFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
