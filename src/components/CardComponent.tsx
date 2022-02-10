import { Card, Button, Icon } from "react-native-elements";
import { Text } from "react-native";
import { Data } from "../Deck";

interface CardComponentProps {
  item: Data;
}

const CardComponent = ({ item: { text, uri } }: CardComponentProps) => {
  return (
    <Card containerStyle={{ borderWidth: 3 }}>
      <Card.Title>{text}</Card.Title>
      <Card.Image source={{  uri }} />
      <Text style={{ marginTop: 10, marginBottom: 10 }}>
        Some information about card here
      </Text>
      <Button
        title=" View"
        icon={<Icon name="code" color="white" size={20} />}
      />
    </Card>
  );
};

export default CardComponent;
