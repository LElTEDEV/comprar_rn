import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d0d2d8",
    paddingTop: 62,
  },

  logo: {
    width: 134,
    height: 34,
  },

  form: {
    gap: 7,
    marginTop: 42,
    width: "100%",
    paddingHorizontal: 16,
  },

  content: {
    flex: 1,
    padding: 24,
    width: "100%",
    marginTop: 24,
    paddingTop: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
  },

  header: {
    gap: 12,
    width: "100%",
    paddingBottom: 12,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E6EC",
  },

  clearButton: {
    marginLeft: "auto",
  },

  clearText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#828282",
  },
});
