import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { phoneValidator } from "../helpers/phoneValidator";
import AuthService from "../services/auth.service"; // Import the register function
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
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

  const onSignUpPressed = async () => {
    try {
      await AuthService.register(username, email, password, name, phone, [
        "user",
      ]);
      // Registration successful, navigate to Dashboard or login screen
      setMessage("Registration successful");
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Handle registration error
      setMessage(errorMessage);
      console.error("Registration error:", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Header>Welcome.</Header>
      {userData && (
        <View style={styles.userDataContainer}>
          <Paragraph>Username: {userData.username}</Paragraph>
          <Paragraph>Email: {userData.email}</Paragraph>
          <Paragraph>Name: {userData.name}</Paragraph>
          <Paragraph>Phone: {userData.phone}</Paragraph>
          {/* Add more paragraphs for other user data if needed */}
        </View>
      )}
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={(text) => setName(text)}
        error={!!nameError}
        errorText={nameError}
      />
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username}
        onChangeText={(text) => setUsername(text)}
        error={!!usernameError}
        errorText={usernameError}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={!!emailError}
        errorText={emailError}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        error={!!phoneError}
        errorText={phoneError}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={!!passwordError}
        errorText={passwordError}
        secureTextEntry
      />
      <Text style={styles.alertText}>{message}</Text>
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
  alertText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});
