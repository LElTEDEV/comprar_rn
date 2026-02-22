import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Item } from "@/components/item";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Filter } from "@/components/filter";
import { FilterStatus } from "@/@types/filterStatus";

import { styles } from "./styles";
import {
  addItemStorage,
  clearAllItemStorage,
  getItemsStorage,
  ItemStorage,
  removeItemStorage,
  updateStatusItemStorage,
} from "@/storage/items-storage";

// [
//   { id: 1, description: "Café", status: FilterStatus.PENDING },
//   { id: 2, description: "Leite", status: FilterStatus.DONE },
//   { id: 3, description: "Pão", status: FilterStatus.PENDING },
//   { id: 4, description: "Manteiga", status: FilterStatus.DONE },
//   { id: 5, description: "Ovos", status: FilterStatus.PENDING },
//   { id: 6, description: "Frutas", status: FilterStatus.DONE },
//   { id: 7, description: "Verduras", status: FilterStatus.PENDING },
//   { id: 8, description: "Carnes", status: FilterStatus.DONE },
//   { id: 9, description: "Bebidas", status: FilterStatus.PENDING },
//   { id: 10, description: "Doces", status: FilterStatus.DONE },
// ];

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [activeFilter, setActiveFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function getStorage() {
    try {
      const storage = await getItemsStorage();

      setItems(storage);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível visualizar os items.");
    }
  }

  async function handleStatusItem(item: ItemStorage) {
    try {
      await updateStatusItemStorage(
        item,
        item.status === FilterStatus.DONE
          ? FilterStatus.PENDING
          : FilterStatus.DONE,
      );

      await getStorage();
    } catch (error) {
      Alert.alert("Erro", "Erro ao tentar atualizar o status do item.");
    }
  }

  async function handleRemove(item: ItemStorage) {
    try {
      await removeItemStorage(item);
      await getStorage();
    } catch (error) {
      Alert.alert("Erro", "Erro ao tentar remover o item da lista de compra.");
    }
  }

  async function handleAddItem() {
    if (description.length <= 0) return;

    await addItemStorage({
      id: String(Math.random()),
      description,
      status: FilterStatus.PENDING,
    });

    await getStorage();
    setDescription("");
  }

  async function clearAllItems() {
    try {
      await clearAllItemStorage();
      await getStorage();
    } catch (error) {
      Alert.alert("Erro", "Erro ao excluir todos os itens do seu carrinho.");
    }
  }

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
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

          <TouchableOpacity style={styles.clearButton} onPress={clearAllItems}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items.filter((item) => item.status === activeFilter)}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item)}
              onStatus={() => handleStatusItem(item)}
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
