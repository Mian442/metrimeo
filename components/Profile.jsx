import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { IconButton, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { DEL_USER_TOKEN, GET_USER_IMAGE } from "../redux/actions/UserActions";
const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.TOKEN);
  const [image, setImage] = useState("");
  const list = [
    {
      name: "Contact Us",
      icon: "information-outline",
      type: "material-community",
      screen: "Contact Us",
    },
    {
      name: "Logout",
      icon: "logout",
      type: "antdesign",
      screen: "Setting",
    },
  ];
  useEffect(() => {
    dispatch(
      GET_USER_IMAGE(user.user2._id, (r) => {
        setImage(r);
      })
    );
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ backgroundColor: "#3ba1da" }}>
          <IconButton
            icon="menu"
            color="#fff"
            size={38}
            style={{ marginVertical: "8.5%" }}
            onPress={() => navigation.openDrawer()}
          />
          <Avatar
            rounded
            size={220}
            overlayContainerStyle={{ backgroundColor: "#009688" }}
            activeOpacity={0.7}
            containerStyle={{ alignSelf: "center" }}
            //source={{ uri: image }}
            source={
              image ? { uri: image } : require("../assets/images/man.png")
            }
          />
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 42,
                color: "#fff",
              }}
            >
              {user.user2.name}
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          {list.map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.5}
              onPress={() => {
                if (item.name === "Logout") {
                  dispatch(DEL_USER_TOKEN());
                } else navigation.navigate(item.screen);
              }}
            >
              <ListItem bottomDivider>
                <Icon
                  name={item.icon}
                  type={item.type}
                  color="#fff"
                  size={28}
                  style={{
                    backgroundColor: "#2196f3",
                    padding: 8,
                    borderRadius: 8,
                    width: 50,
                  }}
                />
                <ListItem.Content>
                  <Title>{item.name}</Title>
                </ListItem.Content>
                <ListItem.Chevron size={42} />
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
});
