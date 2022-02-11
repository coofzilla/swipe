import React, { useState, useEffect } from "react";
import CardComponent from "../src/components/CardComponent";
import { Button } from "react-native";
import { endURI } from "../src/Data";

const renderNoMoreCards = (
  cardIndex: number,
  data: number,
  setCardIndex: React.Dispatch<React.SetStateAction<number>>
) => {

  if (cardIndex >= data) {
    return (
      <>
        <CardComponent
          item={{
            id: 999,
            text: "",
            uri: endURI,
          }}
          cardText=""
        />
        <Button
          title="Reset"
          onPress={() => {
            setCardIndex(0);
          }}
        />
      </>
    );
  }
};

export default renderNoMoreCards;
