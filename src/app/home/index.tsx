import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Item } from "@/components/item";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Filter } from "@/components/filter";
import { FilterStatus } from "@/@types/filterStatus";

import { styles } from "./styles";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [activeFilter, setActiveFilter] = useState(FilterStatus.PENDING);
  const [items, setItems] = useState([
    { id: 1, description: "Café", status: FilterStatus.PENDING },
    { id: 2, description: "Leite", status: FilterStatus.DONE },
    { id: 3, description: "Pão", status: FilterStatus.PENDING },
    { id: 4, description: "Manteiga", status: FilterStatus.DONE },
    { id: 5, description: "Ovos", status: FilterStatus.PENDING },
    { id: 6, description: "Frutas", status: FilterStatus.DONE },
    { id: 7, description: "Verduras", status: FilterStatus.PENDING },
    { id: 8, description: "Carnes", status: FilterStatus.DONE },
    { id: 9, description: "Bebidas", status: FilterStatus.PENDING },
    { id: 10, description: "Doces", status: FilterStatus.DONE },
  ]);

  function handleStatusItem(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === FilterStatus.DONE
                  ? FilterStatus.PENDING
                  : FilterStatus.DONE,
            }
          : item,
      ),
    );
  }

  function handleRemove(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClearList() {
    setItems([]);
  }

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

          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearList}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleStatusItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
