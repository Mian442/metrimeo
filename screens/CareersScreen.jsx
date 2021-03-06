import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import React, { createRef, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Button,
  Paragraph,
  Subheading,
  TextInput,
} from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { CheckBox, Image } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import SavingModel from "../components/SavingModel";
import { useDispatch } from "react-redux";
import { CAREER } from "../redux/actions/UserActions";
import * as yup from "yup";
import { Toast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Linking } from "react-native";
const CareersScreen = () => {
  const initial = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    country: {
      text: "Desired Location – Country",
      index: 0,
    },
    city: "",
    workOn: "",
    education: {
      text: "Higher Education",
      index: 0,
    },
    interest: {
      text: "Area of interest",
      index: 0,
    },
    resume: "",
    letter: "",
    policy: false,
    experience: "",
  };
  let schema = yup.object().shape({
    fname: yup.string().required("First name is required!"),
    lname: yup.string().required("Last name is required!"),
    email: yup.string().email().required(),
    phone: yup.number().min(5).required(),
    country: yup.string().required(),
    city: yup.string().required(),
    allowedToWork: yup.string().required(),
    education: yup.string().required(),
    interests: yup.string().required(),
    resume: yup.object().shape({
      base64: yup.string().required(),
      name: yup.string().required(),
      type: yup.string().required(),
      size: yup
        .number()
        .min(1 * 1024)
        .required(),
    }),
    coverLetter: yup.object().shape({
      base64: yup.string().required(),
      name: yup.string().required(),
      type: yup.string().required(),
      size: yup
        .number()
        .min(1 * 1024)
        .required(),
    }),
  });
  const [career, setCareer] = useState(initial);
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const countries = [
    "None",
    "Cameroon",
    "Chad",
    "Congo",
    "Equatorial Guinea",
    "Gabon",
    "Central African Republic",
    "United States",
  ];
  const education = [
    "Doctorate",
    "Master",
    "Bachelor",
    "Associate",
    "High School GED",
    "Trade Certificate",
  ];
  const interest = [
    "Client Services",
    "Corporate Support",
    "Data & Analytics",
    "Sales & Marketing",
    "Students & Recent Graduates",
    "Technology",
  ];
  const list = [
    {
      name: "First Name *",
      label: "First Name *",
      value: career.fname,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setCareer({ ...career, fname: text }),
      nextIndex: 1,
    },
    {
      name: "Last Name *",
      label: "Last Name *",
      value: career.lname,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setCareer({ ...career, lname: text }),
      nextIndex: 2,
    },
    {
      name: "Email Address *",
      label: "Email Address *",
      value: career.email,
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setCareer({ ...career, email: text }),
      nextIndex: 3,
    },
    {
      name: "Phone Number *",
      value: career.phone,
      label: "Phone Number *",
      ref: createRef(),
      blur: false,
      submitType: "next",
      change: (text) => setCareer({ ...career, phone: text }),
      nextIndex: 4,
    },
    {
      name: "Desired Location - City *",
      value: career.city,
      label: "Desired Location - City *",
      ref: createRef(),
      blur: true,
      submitType: "done",
      change: (text) => setCareer({ ...career, city: text }),
      nextIndex: -1,
    },
  ];

  const DocPicker = async (type) => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/*",
      });
      if (file.type === "success" && file.size < 250000) {
        let fileBase64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: "base64",
        });
        console.log(fileBase64.length, type);
        if (type === "resume") {
          setCareer({
            ...career,
            resume: {
              base64: "data:application/*;base64," + fileBase64,
              name: file.name,
              type: "application/*",
              size: file.size,
            },
          });
        }
        if (type === "letter") {
          setCareer({
            ...career,
            letter: {
              base64: "data:application/*;base64," + fileBase64,
              name: file.name,
              type: "application/*",
              size: file.size,
            },
          });
        }
      } else {
        let s = file.size / (1024 * 1024);
        alert("File Size " + s.toFixed(2) + " Mb\nMaximum Limit 2Mb");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Image
              source={require("../assets/images/metrimeo.png")}
              style={{ height: 68, width: 260, marginVertical: 7 }}
            />
            <Paragraph
              style={{ marginVertical: 7, color: "gray", textAlign: "justify" }}
            >
              Joining our Talent Community is a great way to stay connected to
              the firm, be considered for open roles and be informed about new
              positions as they become available. By completing the form below,
              our team of recruiters can connect you with opportunities that fit
              your profile. Join Now!
            </Paragraph>
          </View>

          {list.map((item, i) => (
            <View key={i} style={{ marginVertical: 7 }}>
              <TextInput
                label={item.label}
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
                keyboardType={
                  item.label === "Phone Number *" ? "numeric" : "default"
                }
                secureTextEntry={item.secureTextEntry}
              />
              {item.label === "Desired Location - City *" && (
                <>
                  <Subheading style={{ marginTop: 14 }}>
                    Are you allowed to work in your desired country?
                  </Subheading>
                  <CheckBox
                    title="Yes"
                    checkedIcon="radio-button-on"
                    uncheckedIcon="radio-button-off"
                    iconType="material"
                    checked={career.workOn === "Yes" ? true : false}
                    containerStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      marginHorizontal: 0,
                      padding: 0,
                      marginVertical: 7,
                    }}
                    textStyle={{ fontWeight: "normal", color: "black" }}
                    onPress={() => setCareer({ ...career, workOn: "Yes" })}
                  />
                  <CheckBox
                    title="No"
                    checkedIcon="radio-button-on"
                    uncheckedIcon="radio-button-off"
                    iconType="material"
                    checked={career.workOn === "No" ? true : false}
                    containerStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      margin: 0,
                      padding: 0,
                      marginTop: 7,
                    }}
                    textStyle={{ fontWeight: "normal", color: "black" }}
                    onPress={() => setCareer({ ...career, workOn: "No" })}
                  />
                </>
              )}
              {item.label === "Phone Number *" && (
                <Select
                  selectedIndex={new IndexPath(career.country.index)}
                  onSelect={(index) =>
                    setCareer({
                      ...career,
                      country: { text: countries[index.row], index: index.row },
                    })
                  }
                  value={career.country.text}
                  style={{ marginTop: 21 }}
                >
                  {countries.map((item, i) => (
                    <SelectItem title={item} key={i} />
                  ))}
                </Select>
              )}
            </View>
          ))}
          <Select
            selectedIndex={new IndexPath(career.education.index)}
            onSelect={(index) =>
              setCareer({
                ...career,
                education: { text: education[index.row], index: index.row },
              })
            }
            value={career.education.text}
            style={{ marginTop: 14 }}
          >
            {education.map((item, i) => (
              <SelectItem title={item} key={i} />
            ))}
          </Select>
          <Select
            selectedIndex={new IndexPath(career.interest.index)}
            onSelect={(index) =>
              setCareer({
                ...career,
                interest: { text: interest[index.row], index: index.row },
              })
            }
            value={career.interest.text}
            style={{ marginTop: 21 }}
          >
            {interest.map((item, i) => (
              <SelectItem title={item} key={i} />
            ))}
          </Select>
          <TextInput
            label="Number Of Years Of Experience *"
            placeholder="Number Of Years Of Experience *"
            value={career.experience}
            onChangeText={(text) => setCareer({ ...career, experience: text })}
            mode="outlined"
            keyboardType={"numeric"}
            style={{ marginVertical: 7 }}
          />
          <Paragraph style={{ marginTop: 14 }}>
            Upload Your Resume * (.rtf, .doc, .docx, .txt, .pdf files with a 2MB
            maximum file size are supported)
          </Paragraph>
          <Button
            uppercase={false}
            style={{
              marginVertical: 7,
            }}
            labelStyle={{ color: "white" }}
            mode="contained"
            onPress={() => {
              DocPicker("resume");
            }}
          >
            Upload Resume
          </Button>
          <Paragraph style={{ marginTop: 7 }}>
            Upload Your Resume * (.rtf, .doc, .docx, .txt, .pdf files with a 2MB
            maximum file size are supported)
          </Paragraph>
          <Button
            uppercase={false}
            style={{
              marginVertical: 7,
            }}
            labelStyle={{ color: "white" }}
            mode="contained"
            onPress={() => {
              DocPicker("letter");
            }}
          >
            Upload Your cover letter
          </Button>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ opacity: 0.54, flexShrink: 1 }}>
              By continuing you accept our
            </Text>

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
          <CheckBox
            title="Yes, I agree to our Terms & Conditions and Privacy Policy"
            checked={career.policy}
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            size={26}
            iconType="material"
            containerStyle={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              margin: 0,
              padding: 0,
              marginVertical: 7,
            }}
            textStyle={{ fontWeight: "normal", color: "black" }}
            onPress={() => setCareer({ ...career, policy: !career.policy })}
          />
          <Button
            uppercase={false}
            style={{
              marginVertical: 7,
            }}
            labelStyle={{ color: "white" }}
            mode="contained"
            disabled={!career.policy}
            onPress={() => {
              let data = {
                resume: career.resume,
                coverLetter: career.letter,
                fname: career.fname,
                lname: career.lname,
                email: career.email,
                phone: parseInt(career.phone === "" ? 0 : career.phone),
                city: career.city,
                country: career.country.text,
                allowedToWork: career.workOn,
                education: career.education.text,
                interests: career.interest.text,
                experience: parseInt(career.experience),
              };
              schema
                .validate(data, { abortEarly: false })
                .then(function (valid) {
                  setModel(true);
                  dispatch(
                    CAREER(
                      data,
                      () => {
                        setModel(false);
                      },
                      () => {
                        setModel(false);
                        setCareer(initial);
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
        </View>
        <SavingModel visible={model} title="Saving..." />
      </ScrollView>
    </View>
  );
};

export default CareersScreen;

const styles = StyleSheet.create({});
