import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import SavingModel from "../../components/SavingModel";
import { USER, USER_LOGIN } from "../../redux/actions/UserActions";

const MainScreen = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = () => {
    let data = {
      email: login.username.toLowerCase(),
      password: login.password,
    };
    setDisabled(true);
    dispatch(
      USER_LOGIN(data, () => {
        setDisabled(false);
      })
    );
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: "9.5%",
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            source={require("../../assets/images/metrimeo.png")}
            style={{ height: 68, width: 260 }}
          />
          <View style={{ width: 300, marginTop: 50 }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: 28,
                fontWeight: "bold",
                marginVertical: 7,
              }}
            >
              Welcome Back!
            </Text>
            <Button
              uppercase={false}
              style={{
                marginVertical: 7,
              }}
              mode="text"
              onPress={() =>
                navigation.navigate("Sign Up", {
                  name: "Sign Up",
                  for: "SignUp",
                })
              }
            >
              <Text style={{ color: "#5d7280" }}>New to MetriMeo? </Text>Sign Up
            </Button>
            <TextInput
              mode="outlined"
              value={login.username}
              placeholder="Email Address*"
              label="Email Address*"
              onChangeText={(text) => setLogin({ ...login, username: text })}
              autoCapitalize="none"
              style={{ marginVertical: 7 }}
            />
            <TextInput
              mode="outlined"
              value={login.password}
              placeholder="Password*"
              label="Password*"
              secureTextEntry={true}
              onChangeText={(text) => setLogin({ ...login, password: text })}
              autoCapitalize="none"
              style={{ marginVertical: 7 }}
            />
            <Button
              uppercase={false}
              style={{
                width: 300,
                marginVertical: 7,
              }}
              labelStyle={{ color: "white" }}
              mode="contained"
              disabled={disabled}
              onPress={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
            <Button
              uppercase={false}
              style={{
                marginVertical: 2,
              }}
              labelStyle={{
                width: 300,
                textAlign: "left",
              }}
              color="#000"
              mode="text"
              onPress={() => navigation.navigate("Forget Password")}
            >
              Forgot Password ?
            </Button>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              width: 300,
            }}
          >
            <Text style={{ opacity: 0.54 }}>By continuing you accept our</Text>
            <TouchableOpacity>
              <Text
                style={{ color: "#2196f3", textDecorationLine: "underline" }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <Text style={{ opacity: 0.54 }}> and </Text>
            <TouchableOpacity>
              <Text
                style={{ color: "#2196f3", textDecorationLine: "underline" }}
              >
                Privacy Policy{" "}
              </Text>
            </TouchableOpacity>
            <Text style={{ opacity: 0.54 }}>2021.</Text>
          </View>
        </View>
        <SavingModel visible={disabled} title="Loading..." />
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
