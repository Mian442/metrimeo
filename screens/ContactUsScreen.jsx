import React, { createRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, RadioButton, TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import SavingModel from "../components/SavingModel";
import { CONTACT } from "../redux/actions/UserActions";
import * as yup from "yup";
import { Toast } from "native-base";
const ContactUsScreen = () => {
  const initial = {
    name: "",
    email: "",
    comment: "",
    type: "",
    phone: "",
    subject: "",
  };
  const [contact, setContact] = useState(initial);
  const [model, setModel] = useState(false);
  const list = [
    {
      name: "Enter Name",
      label: "Name",
      value: contact.name,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setContact({ ...contact, name: text }),
      nextIndex: 1,
      multiline: false,
      height: 50,
    },
    {
      name: "Enter Email",
      label: "Email",
      value: contact.email,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setContact({ ...contact, email: text }),
      nextIndex: 2,
      multiline: false,
      height: 50,
    },
    {
      name: "Phone",
      label: "Phone",
      value: contact.phone,
      ref: createRef(),
      blur: true,
      submitType: "next",
      change: (text) => setContact({ ...contact, phone: text }),
      nextIndex: 3,
      multiline: true,
      height: 50,
    },
    {
      name: "Subject*",
      label: "Subject",
      value: contact.subject,
      ref: createRef(),
      blur: true,
      submitType: "next",
      change: (text) => setContact({ ...contact, subject: text }),
      nextIndex: 4,
      multiline: true,
      height: 50,
    },
    {
      name: "Message*",
      label: "Message",
      value: contact.comment,
      ref: createRef(),
      blur: true,
      submitType: "done",
      change: (text) => setContact({ ...contact, comment: text }),
      nextIndex: -1,
      multiline: true,
      height: 180,
    },
  ];
  let schema = yup.object().shape({
    fname: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    typeAccount: yup.string().required(),
    message: yup.string().required(),
    subject: yup.string().required(),
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: 20 }}>
        {list.map((item, i) => (
          <View key={i} style={{ marginVertical: 7 }}>
            <TextInput
              label={item.label}
              dense
              placeholder={item.name}
              value={item.value}
              onChangeText={item.change}
              ref={item.ref}
              onSubmitEditing={() => {
                item.nextIndex !== -1 &&
                  list[item.nextIndex].ref.current.focus();
              }}
              mode="outlined"
              blurOnSubmit={item.blur}
              returnKeyType={item.submitType}
              multiline={item.multiline}
            />
            {item.label === "Phone" && (
              <>
                <Title>Customer Type</Title>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => setContact({ ...contact, type: "Individual" })}
                >
                  <RadioButton
                    color="#3ba1da"
                    value="Individual"
                    status={
                      contact.type === "Individual" ? "checked" : "unchecked"
                    }
                    onPress={() =>
                      setContact({ ...contact, type: "Individual" })
                    }
                  />
                  <Text>Individual</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => setContact({ ...contact, type: "Business" })}
                >
                  <RadioButton
                    color="#3ba1da"
                    value="Business"
                    status={
                      contact.type === "Business" ? "checked" : "unchecked"
                    }
                    onPress={() => setContact({ ...contact, type: "Business" })}
                  />
                  <Text>Business</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
        <Button
          uppercase={false}
          labelStyle={{ color: "white" }}
          mode="contained"
          disabled={model}
          style={{ marginVertical: 7 }}
          onPress={() => {
            let data = {
              fname: contact.name,
              email: contact.email,
              phone: contact.phone,
              typeAccount: contact.type,
              message: contact.comment,
              subject: contact.subject,
            };
            schema
              .validate(data, { abortEarly: false })
              .then(function (valid) {
                setModel(true);
                dispatch(
                  CONTACT(
                    data,
                    () => {
                      setModel(false);
                    },
                    () => {
                      setModel(false);
                      setContact(initial);
                    }
                  )
                );
              })
              .catch(({ errors }) => {
                console.log(errors[0]);
                Toast.show({
                  text: errors[0],
                  type: "danger",
                  style: { margin: 10, borderRadius: 7 },
                  textStyle: { textAlign: "center" },
                });
              });
          }}
        >
          Submit
        </Button>
        <SavingModel visible={model} title="Saving..." />
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
