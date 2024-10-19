import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../services/auth.service"; // Import AuthService

export default function Dashboard({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setUserData(JSON.parse(user));
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
      {userData && (
        <View style={styles.userDataContainer}>
          <Paragraph>Username: {userData.username}</Paragraph>
          <Paragraph>Email: {userData.email}</Paragraph>
          <Paragraph>Name: {userData.name}</Paragraph>
          <Paragraph>Phone: {userData.phone}</Paragraph>
          {/* Add more paragraphs for other user data if needed */}
        </View>
      )}
      <Button
        mode="outlined"
        onPress={async () => {
          await AuthService.logout(); // Logout operation
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        }}
      >
        Sign out
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  userDataContainer: {
    marginTop: 20,
  },
});
