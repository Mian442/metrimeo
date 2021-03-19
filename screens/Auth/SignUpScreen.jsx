import React, { createRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  RadioButton,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Icon, Image } from "react-native-elements";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import SavingModel from "../../components/SavingModel";
import { TouchableOpacity } from "react-native";
import AutoCompleteTextField from "../../components/AutoCompleteTextField";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { USER_REGISTER } from "../../redux/actions/UserActions";
import { Toast } from "native-base";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
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
    date: "",
  };

  const [offer, setOffer] = useState(initial);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(true);
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
        date: offer.date,
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

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === "ios");
    setOffer({ ...offer, date: currentDate });
  };

  // if (loading) {
  //   return <Loading />;
  // } else
  return (
    <>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ backgroundColor: "#fff", flex: 1 }}
      >
        <ScrollView
          style={{ margin: 20 }}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
        >
          {show && (
            <DateTimePicker
              locale="es"
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={mode}
              is24Hour={true}
              display="calendar"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
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
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => setOffer({ ...offer, type: "Individual" })}
          >
            <RadioButton
              color="#3ba1da"
              value="Individual"
              status={offer.type === "Individual" ? "checked" : "unchecked"}
              onPress={() => setOffer({ ...offer, type: "Individual" })}
            />
            <Text>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => setOffer({ ...offer, type: "Business" })}
          >
            <RadioButton
              color="#3ba1da"
              value="Business"
              status={offer.type === "Business" ? "checked" : "unchecked"}
              onPress={() => setOffer({ ...offer, type: "Business" })}
            />
            <Text>Business</Text>
          </TouchableOpacity>

          {list.map(
            (item, i) =>
              item.show && (
                <View key={i} style={{ marginVertical: 7 }}>
                  {item.label === "Email Address" && (
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 7,
                        marginHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                        }}
                        onPress={showDatepicker}
                      >
                        <Icon
                          name="calendar-alt"
                          type="font-awesome-5"
                          color="#186eb8"
                          style={{ fontSize: 20 }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 5 }}>
                          {offer.type === "Individual"
                            ? "Birth "
                            : "Business Creation"}
                          Date
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 18,
                            color: "#186eb8",
                          }}
                        >
                          {offer.date.toString().substr(4, 12)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
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
        </ScrollView>
      </KeyboardAvoidingView>
      <SavingModel visible={model} title="Saving..." />
    </>
  );
};

export default ProfileForm;
