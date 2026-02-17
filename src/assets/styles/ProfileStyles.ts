import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  /* HEADER */
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2A44",
  },

  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  phone: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2A44",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },

  editText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  /* SECTION */
  sectionContainer: {
    marginTop: 20,
  },

  sectionLabel: {
    alignSelf: "flex-start",
    backgroundColor: "#1F2A44",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: -10,
    zIndex: 1,
  },

  sectionLabelText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 15,
    paddingVertical: 5,
    paddingTop: 15,
  },

  /* MENU */
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  lastMenuItem: {
    borderBottomWidth: 0,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#333",
  },

  /* LOGOUT */
  logoutCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 25,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#E53935",
  },

  versionText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 13,
  },
});
