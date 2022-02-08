import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Card, Button, Icon } from "react-native-elements";

interface Data {
  id: number;
  text: string;
  uri: string;
}

interface DeckProps {
  data: Data[];
}

const Deck = ({ data }: DeckProps) => {
  const panResponder = useRef(
    PanResponder.create({
      //called when click
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      //called whenver user drags finger across scren
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {},
    })
  );

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Card>
              <Card.Title>{item.text}</Card.Title>
              <Card.Image source={{ uri: item.uri }} />
              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                Some information about card here
              </Text>
              <Button
                title=" View"
                icon={<Icon name="code" color="white" size={20} />}
              />
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Deck;
