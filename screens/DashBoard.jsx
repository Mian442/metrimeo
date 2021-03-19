import React from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import {
  Caption,
  DataTable,
  Divider,
  ProgressBar,
  Surface,
  Title,
} from "react-native-paper";

const DashBoard = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        <Title>Here is your credit snapshot</Title>
        <Surface style={styles.surface}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flexGrow: 2 }}>
              <ProgressBar
                progress={0.88}
                color="#186eb8"
                style={{ height: 12, borderRadius: 7, marginVertical: 7 }}
              />
            </View>

            <Caption style={{ flexGrow: 1, fontSize: 14, marginLeft: 7 }}>
              88%
            </Caption>
          </View>
          <Title
            style={{ alignSelf: "center", fontSize: 32, marginVertical: 14 }}
          >
            786
          </Title>
          <Divider />
          <View>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Credit Usage</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text style={{ color: "red" }}>9%</Text>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Total Debit</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text style={{ color: "green" }}>$124,614</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Open Accounts</DataTable.Cell>
                <DataTable.Cell numeric>7</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </Surface>
        <Title style={{ marginVertical: 7 }}>
          What would you like to do today?
        </Title>
        <Surface style={styles.surface}>
          <TouchableOpacity>
            <View style={{ display: "flex" }}>
              <Icon
                name="speed"
                type="material"
                style={{ alignSelf: "center" }}
                color="purple"
                size={150}
              />
              <Title style={{ textAlign: "center" }}>Improve your credit</Title>
            </View>
          </TouchableOpacity>
        </Surface>
        <Surface style={styles.surface}>
          <TouchableOpacity>
            <View style={{ display: "flex" }}>
              <Icon
                name="chart-donut"
                type="material-community"
                style={{ alignSelf: "center" }}
                color="green"
                size={150}
              />
              <Title style={{ textAlign: "center" }}>Review Your data</Title>
            </View>
          </TouchableOpacity>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  surface: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
    padding: 10,
    display: "flex",
    marginVertical: 7,
  },
});
