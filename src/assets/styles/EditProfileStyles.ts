import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
  },

  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  cameraButton: {
    position: "absolute",
    right: 130,
    bottom: 0,
    backgroundColor: "#F4A261",
    padding: 8,
    borderRadius: 20,
  },

  label: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 6,
    fontWeight: "600",
    color: "#1F2A44",
  },

  input: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  genderCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  genderActive: {
    backgroundColor: "#1F2A44",
  },

  genderText: {
    marginTop: 10,
    fontWeight: "600",
    color: "#1F2A44",
  },

  genderTextActive: {
    color: "#fff",
  },

  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#F4F6F9",
    padding: 20,
  },

  saveButton: {
    backgroundColor: "#1F2A44",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  dropdown: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
  },

  dropdownDisabled: {
    backgroundColor: "#F0F0F0",
  },

  selectedTextStyle: {
    fontSize: 14,
    color: "#1F2A44",
  },

  inputSearchStyle: {
    height: 45,
    fontSize: 14,
    borderRadius: 8,
  },

  containerStyle: {
    borderRadius: 12,
  },

  itemTextStyle: {
    fontSize: 14,
    color: "#1F2A44",
  },

  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },

});
