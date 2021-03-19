import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Divider,
} from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Icon } from "react-native-elements";
import { GET_USER_IMAGE, DEL_USER_TOKEN } from "../redux/actions/UserActions";

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  const [image, setImage] = useState("");
  const list = [
    {
      name: "Home",
      icon: "home",
      type: "font-awesome-5",
      screen: "Home",
      shown: true,
    },
    {
      name: "Dashboard",
      icon: "dashboard",
      type: "material",
      screen: "DashBoard",
      shown: IS_LOGGED,
    },
    {
      name: "Careers",
      icon: "stairs-up",
      type: "material-community",
      screen: "Careers",
      shown: true,
    },
    {
      name: "Contact Us",
      icon: "contact-support",
      type: "material",
      screen: "Contact Us",
      shown: true,
    },
    {
      name: "Profile",
      icon: "user-alt",
      type: "font-awesome-5",
      screen: "Profile",
      shown: IS_LOGGED,
    },
    {
      name: "Sign Out",
      icon: "logout",
      type: "ant-design",
      screen: "Profile",
      shown: IS_LOGGED,
    },
    {
      name: "Login In",
      icon: "login",
      type: "ant-design",
      screen: "Profile",
      shown: !IS_LOGGED,
    },
  ];
  useEffect(() => {
    if (IS_LOGGED) {
      dispatch(
        GET_USER_IMAGE(User.user2._id, (r) => {
          setImage(r);
        })
      );
    }
  }, [IS_LOGGED]);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.drawerContent}>
          <View style={{ margin: 10 }}>
            {IS_LOGGED && (
              <View style={{ flexDirection: "column", marginTop: 15 }}>
                <Avatar
                  rounded
                  size={120}
                  overlayContainerStyle={{ backgroundColor: "#186eb8" }}
                  activeOpacity={0.7}
                  containerStyle={{ alignSelf: "center" }}
                  source={
                    image ? { uri: image } : require("../assets/images/man.png")
                  }
                />
                <Title style={styles.title}>{User?.user2.name}</Title>
              </View>
            )}
          </View>
          <Divider
            style={{ backgroundColor: "gray", margin: 7, height: 0.6 }}
          />
          <Drawer.Section style={styles.drawerSection} {...props}>
            {list.map(
              (item, i) =>
                item.shown && (
                  <TouchableRipple
                    onPress={() => {
                      if (item.name === "Sign Out") {
                        props.navigation.closeDrawer();
                        dispatch(DEL_USER_TOKEN());
                      } else props.navigation.navigate(item.screen);
                    }}
                    style={{ paddingVertical: 6 }}
                    key={i}
                  >
                    <View
                      style={[
                        styles.row,
                        {
                          marginHorizontal: 17,
                          marginVertical: 7,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Icon type={item.type} name={item.icon} color="#186eb8" />
                      <Text
                        style={{
                          paddingLeft: 32,
                          color: "#186eb8",
                          flexGrow: 1,
                          fontSize: 16,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableRipple>
                )
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#e0e0e0",
  },
});
