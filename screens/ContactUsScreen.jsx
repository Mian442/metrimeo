import React, { createRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import SavingModel from "../components/SavingModel";
import { CONTACT } from "../redux/actions/UserActions";
import * as yup from "yup";
import { Toast } from "native-base";
import { CheckBox } from "react-native-elements";
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
      name: "Enter Name *",
      label: "Name *",
      value: contact.name,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setContact({ ...contact, name: text }),
      nextIndex: 1,
      multiline: false,
      numberOfLines: 1,
    },
    {
      name: "Enter Email *",
      label: "Email *",
      value: contact.email,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setContact({ ...contact, email: text }),
      nextIndex: 2,
      multiline: false,
      numberOfLines: 1,
    },
    {
      name: "Phone *",
      label: "Phone *",
      value: contact.phone,
      ref: createRef(),
      blur: true,
      submitType: "next",
      change: (text) => setContact({ ...contact, phone: text }),
      nextIndex: 3,
      multiline: true,
      numberOfLines: 1,
    },
    {
      name: "Subject*",
      label: "Subject *",
      value: contact.subject,
      ref: createRef(),
      blur: true,
      submitType: "next",
      change: (text) => setContact({ ...contact, subject: text }),
      nextIndex: 4,
      multiline: true,
      numberOfLines: 1,
    },
    {
      name: "Message *",
      label: "Message *",
      value: contact.comment,
      ref: createRef(),
      blur: true,
      submitType: "done",
      change: (text) => setContact({ ...contact, comment: text }),
      nextIndex: -1,
      multiline: true,
      numberOfLines: 5,
    },
  ];
  let schema = yup.object().shape({
    fname: yup.string().required("First name is required!"),
    email: yup.string().email().required(),
    phone: yup.number().min(5).required(),
    typeAccount: yup.string().required(),
    subject: yup.string().required(),
    message: yup.string().required(),
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
              keyboardType={item.label === "Phone *" ? "numeric" : "default"}
              numberOfLines={item.numberOfLines}
            />
            {item.label === "Phone *" && (
              <>
                <Title>Customer Type</Title>

                <CheckBox
                  title="Individual"
                  checkedIcon="radio-button-on"
                  uncheckedIcon="radio-button-off"
                  iconType="material"
                  checked={contact.type === "Individual" ? true : false}
                  containerStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    marginHorizontal: 0,
                    padding: 0,
                    marginVertical: 7,
                  }}
                  textStyle={{ fontWeight: "normal", color: "black" }}
                  onPress={() => setContact({ ...contact, type: "Individual" })}
                />
                <CheckBox
                  title="Business"
                  checkedIcon="radio-button-on"
                  uncheckedIcon="radio-button-off"
                  iconType="material"
                  checked={contact.type === "Business" ? true : false}
                  containerStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    marginHorizontal: 0,
                    padding: 0,
                    marginVertical: 7,
                  }}
                  textStyle={{ fontWeight: "normal", color: "black" }}
                  onPress={() => setContact({ ...contact, type: "Business" })}
                />
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
              phone: contact.phone === "" ? 0 : contact.phone,
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
