import React, { createRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { CheckBox, Image } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import SavingModel from "../../components/SavingModel";
import AutoCompleteTextField from "../../components/AutoCompleteTextField";
import { KeyboardAvoidingView } from "react-native";
import { USER_REGISTER } from "../../redux/actions/UserActions";
import { Toast } from "native-base";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
const ProfileForm = () => {
  const initial = {
    phone: "",
    type: "Individual",
    country: "",
    name: "",
    email: "",
    username: "",
    password: "",
    cPassword: "",
  };

  const [offer, setOffer] = useState(initial);
  const [model, setModel] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const list = [
    {
      name: `Enter ${offer.type === "Individual" ? "First" : "Business"} Name`,
      label: `${offer.type === "Individual" ? "First" : "Business"} Name`,
      value: offer.name,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setOffer({ ...offer, name: text }),
      show: true,
      secureTextEntry: false,
      nextIndex: 1,
    },
    {
      name: "Enter Last Name",
      label: "Last Name",
      value: offer.username,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setOffer({ ...offer, username: text }),
      show: offer.type === "Individual" ? true : false,
      secureTextEntry: false,
      nextIndex: 2,
    },
    {
      name: "Enter Email Address",
      label: "Email Address",
      value: offer.email,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setOffer({ ...offer, email: text }),
      show: true,
      secureTextEntry: false,
      nextIndex: 3,
    },
    {
      name: "Enter Phone",
      value: offer.phone,
      label: "Phone",
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setOffer({ ...offer, phone: text }),
      show: true,
      secureTextEntry: false,
      nextIndex: 4,
    },
    {
      name: "Enter Password",
      value: offer.password,
      label: "Password",
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setOffer({ ...offer, password: text }),
      show: true,
      secureTextEntry: true,
      nextIndex: 5,
    },
    {
      name: "Confirm Password",
      value: offer.cPassword,
      label: "Confirm Password",
      ref: createRef(),
      blur: true,
      submitType: "done",
      change: (text) => setOffer({ ...offer, cPassword: text }),
      show: true,
      secureTextEntry: true,
      nextIndex: -1,
    },
  ];

  const handelData = () => {
    if (offer.cPassword === offer.password) {
      let data = {
        email: offer.email.toLowerCase(),
        password: offer.password,
        type: offer.type,
        phone: offer.phone,
        country: offer.country,
        username: offer.username,
        fname: offer.name,
      };
      console.log(offer);
      setModel(true);
      dispatch(
        USER_REGISTER(
          data,
          () => {
            setModel(false);
          },
          () => {
            setModel(false);
            navigation.goBack();
          }
        )
      );
    } else {
      Toast.show({
        text: "Password Not matched!",
        style: { margin: 10, borderRadius: 7 },
        textStyle: { textAlign: "center" },
        type: "success",
      });
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={{ backgroundColor: "#fff", flex: 1 }}>
        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/metrimeo.png")}
              style={{ height: 68, width: 260 }}
            />
          </View>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: 28,
              fontWeight: "bold",
              marginVertical: 7,
            }}
          >
            Welcome to a world of Trust and Financial progress
          </Text>
          <Button
            uppercase={false}
            style={{
              marginVertical: 7,
            }}
            mode="text"
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#5d7280" }}>Already signed up? </Text>Log In
          </Button>
          <Title>Customer Type</Title>
          <CheckBox
            title="Individual"
            checkedIcon="radio-button-on"
            uncheckedIcon="radio-button-off"
            iconType="material"
            checked={offer.type === "Individual" ? true : false}
            containerStyle={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              marginHorizontal: 0,
              padding: 0,
              marginVertical: 7,
            }}
            textStyle={{ fontWeight: "normal", color: "black" }}
            onPress={() => setOffer({ ...offer, type: "Individual" })}
          />
          <CheckBox
            title="Business"
            checkedIcon="radio-button-on"
            uncheckedIcon="radio-button-off"
            iconType="material"
            checked={offer.type === "Business" ? true : false}
            containerStyle={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              marginHorizontal: 0,
              padding: 0,
              marginVertical: 7,
            }}
            textStyle={{ fontWeight: "normal", color: "black" }}
            onPress={() => setOffer({ ...offer, type: "Business" })}
          />
          {list.map(
            (item, i) =>
              item.show && (
                <View key={i} style={{ marginVertical: 7 }}>
                  <TextInput
                    label={item.label}
                    placeholder={item.name}
                    value={item.value}
                    dense
                    onChangeText={item.change}
                    ref={item.ref}
                    onSubmitEditing={() => {
                      item.nextIndex !== -1 &&
                        list[item.nextIndex].ref.current.focus();
                    }}
                    mode="outlined"
                    blurOnSubmit={item.blur}
                    returnKeyType={item.submitType}
                    keyboardType={
                      item.label === "Phone" ? "numeric" : "default"
                    }
                    secureTextEntry={item.secureTextEntry}
                  />
                  {item.label === "Phone" && (
                    <AutoCompleteTextField offer={offer} setOffer={setOffer} />
                  )}
                </View>
              )
          )}

          <Button
            uppercase={false}
            labelStyle={{ color: "white" }}
            style={{ marginVertical: 7 }}
            mode="contained"
            disabled={model}
            onPress={handelData}
          >
            Sign Up
          </Button>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ opacity: 0.54 }}>By continuing you accept our</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://metrimeo-react.herokuapp.com/terms-and-conditions"
                )
              }
            >
              <Text
                style={{ color: "#2196f3", textDecorationLine: "underline" }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <Text style={{ opacity: 0.54 }}> and </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://metrimeo-react.herokuapp.com/privacy-policy"
                )
              }
            >
              <Text
                style={{ color: "#2196f3", textDecorationLine: "underline" }}
              >
                Privacy Policy{" "}
              </Text>
            </TouchableOpacity>
            <Text style={{ opacity: 0.54 }}>2021.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <SavingModel visible={model} title="Saving..." />
    </>
  );
};

export default ProfileForm;
