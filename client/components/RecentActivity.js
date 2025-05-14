import {
  View,
  FlatList,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";
import ActivityDisplay from "./ActivityDisplay";
import { recentActivity } from "../styles/components/recent-activity";
import { homeStyles } from "../styles/screens/home";


export default function RecentActivity({ onPress, activity, loading }) {
  return (
    <View style={recentActivity.container}>
      <View style={recentActivity.header}>
        <CustomText text="Actividad Reciente" type="TitleSmall" />
      </View>
      {loading || activity.length === 0 
        ? (
          <View style={homeStyles.recentActivityContainer}>
            <CustomText 
            text={"Cargando..."} 
            type={"TextSmall"}
            />
          </View>
        ): (
          <FlatList
          showsVerticalScrollIndicator={false}
          data={activity}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityDisplay
              {...item}
              screen={item.category ? "expense" : "income"}
              onPress={() => onPress(item)}
            />
          )}
          />
        )}
    </View>
  );
}
