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
} from "react-native";

interface Data {
  id: number;
  text: string;
  uri: string;
}

interface DeckProps {
  data: Data[];
  renderCard: (item: string) => JSX.Element;
}

const Deck = ({ data }: DeckProps) => {
  return (
    <View>
      <Text>Swipe Deck</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Deck;
