import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator
        animating={true}
        color="#1de9b6"
        size={50}
        style={{}}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
