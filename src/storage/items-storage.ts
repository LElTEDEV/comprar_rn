import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/@types/filterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

export async function getItemsStorage(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
}

async function save(item: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(item));
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error);
  }
}

export async function addItemStorage(item: ItemStorage) {
  try {
    let storage = await getItemsStorage();

    storage = [...storage, item];

    await save(storage);
  } catch (error) {
    throw new Error("ADD_ITEM: " + error);
  }
}

export async function removeItemStorage(item: ItemStorage) {
  try {
    const storage = await getItemsStorage();

    const newStorage = storage.filter((i) => i.id !== item.id);

    await save(newStorage);
  } catch (error) {
    throw new Error("REMOVE_ITEM: " + error);
  }
}

export async function updateStatusItemStorage(
  item: ItemStorage,
  newStatus: FilterStatus,
) {
  try {
    const storage = await getItemsStorage();

    const newStorage = storage.map((i) =>
      i.id === item.id ? { ...i, status: newStatus } : i,
    );

    await save(newStorage);
  } catch (error) {
    throw new Error("UPDATE_STATUS_ITEM: " + error);
  }
}

export async function clearAllItemStorage() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("CLEAR_ALL_ITEMS: " + error);
  }
}
