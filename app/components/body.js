import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Profiles from "../../assets/Profiles";

const Body = () => {
  console.log("Profiles", Profiles.mtl);

  return (
    <View>
      <ImageBackground
        source={Profiles.mtl.image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.text}>{Profiles.mtl.name}</Text>
        <Text style={styles.text}>{Profiles.mtl.caption}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1.1,
    justifyContent: "space-between",
  },
  imageStyle: {
    borderRadius: 8,
  },
  text: {
    padding: 8,
    color: "white",
  },
});

export default Body;
