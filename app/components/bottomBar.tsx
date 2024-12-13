import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BottomBar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Left Icons */}
      <View style={styles.iconGroup}>
        <TouchableOpacity
          onPress={() => router.push("/create")}
          style={styles.iconButton}
        >
          <Ionicons name="bookmark-outline" size={30} color="#093B39" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/newpage")}
          style={styles.iconButton}
        >
          <Ionicons name="notifications-outline" size={30} color="#093B39" />
        </TouchableOpacity>
      </View>

      {/* Center Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Right Icons */}
      <View style={styles.iconGroup}>
        <TouchableOpacity
          onPress={() => router.push("/aboutus")}
          style={styles.iconButton}
        >
          <Ionicons name="person-outline" size={30} color="#093B39" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/Home")}
          style={styles.iconButton}
        >
          <Ionicons name="home-outline" size={30} color="#093B39" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#65BCB5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    elevation: 5,
  },
  iconGroup: {
    flexDirection: "row",
    gap: 25,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#ED802A",
    height: 65,
    width: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    marginBottom: 10,
  },
});
