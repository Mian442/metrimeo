import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function TabOneScreen() {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const User = useSelector((state) => state.User.TOKEN);
  const dispatch = useDispatch();
  // if (!loading) {
  //   return <Loading />;
  // } else
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/Modern-architecture-building.jpg")}
          style={styles.image}
        >
          <View style={{ margin: 20 }}>
            <Text style={{ marginVertical: 4 }}>
              <Text style={styles.title}>Welcome to a new</Text>
            </Text>

            <Text style={{ marginVertical: 4 }}>
              <Text style={styles.title}> World!</Text>
            </Text>
            <Text
              style={[
                {
                  backgroundColor: "transparent",
                  color: "#FFF",
                  fontSize: 65,
                  marginVertical: 7,
                  fontWeight: "bold",
                  fontFamily: `sans-serif`,
                  textShadowColor: "rgba(0,0,0,0.4)",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 30,
                },
              ]}
            >
              MetriMeo
            </Text>
            <Divider
              style={{
                height: 7,
                marginVertical: 14,
                marginBottom: 28,
                backgroundColor: "#e06219",
                width: "14%",
              }}
            />
            <Text style={{ marginVertical: 4 }}>
              <Text style={styles.title}>A World of Trust and </Text>
            </Text>
            <Text style={{ marginVertical: 4 }}>
              <Text style={styles.title}>financial progress</Text>
            </Text>
            <Button
              uppercase={false}
              labelStyle={{ color: "white" }}
              style={{
                marginVertical: 28,
                borderRadius: 25,
                alignSelf: "flex-start",
                width: 180,
                padding: 2,
              }}
              labelStyle={{ fontSize: 16 }}
              mode="contained"
              onPress={() => navigation.navigate("Profile")}
            >
              Get Started!
            </Button>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "rgba(251, 252, 252, 0.66)",
    fontSize: 38,
    color: "#e06219",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textAlign: "left",
    padding: 2,
  },
});
