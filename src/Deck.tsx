import React, { useEffect } from "react";
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
  renderCard: (item: string) => JSX.Element;
}

const Deck = ({ data, renderCard }: DeckProps) => {
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
