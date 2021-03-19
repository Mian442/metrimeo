import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Title>Password Rest</Title>
      <TextInput
        label="Email"
        placeholder="Enter Email"
        value={email}
        dense
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
      />
      <Button
        style={{
          borderRadius: 20,
          marginVertical: 20,
        }}
        color="#e65100"
        mode="contained"
      >
        Submit
      </Button>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({});
