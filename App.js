import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";

// Import icons
const DiscoverIcon = "./assets/Icons/discover_light.png";
const HeartIcon = "./assets/Icons/heart_light.png";
const MessagesIcon = "./assets/Icons/messages_light.png";
const MenuIcon = "./assets/Icons/menu_light.png";
const SunIcon = "./assets/Icons/sun.png";
const ProfileImage = "./assets/Profiles/mtl.jpg";
const PlayerIcon = "./assets/Icons/player_light.png";
const AudioWaveformIcon = "./assets/Icons/audio_waveform_light.png";

function Header() {
  return (
    <View style={styles.header}>
      <Image source={require(MenuIcon)} style={styles.headerIcon} />
      <Text style={styles.headerText}>ensom</Text>
      <Image source={require(SunIcon)} style={styles.headerIcon} />
    </View>
  );
}

// In the WhiteBox component
function WhiteBox() {
  return (
    <View style={styles.whiteBox}>
      <Text style={styles.whiteBoxTitle}>My hottest take</Text>
      <View style={styles.whiteBoxContent}>
        <View style={styles.playerWrapper}>
          <Image source={require(PlayerIcon)} style={styles.whiteBoxIcon} />
        </View>
        <View style={styles.audioWaveWrapper}>
          <Image
            source={require(AudioWaveformIcon)}
            style={styles.audioWaveformIcon}
          />
        </View>
      </View>
    </View>
  );
}

function Card() {
  return (
    <View style={styles.card}>
      <Image source={require(ProfileImage)} style={styles.cardImage} />

      <Text style={styles.cardTopLeftText}>MTL</Text>
      <Text style={styles.cardBottomLeftText}>1 mile away</Text>
    </View>
  );
}

/* This is the home screen used for the navigation system, we'll
 * learn more about in the coming weeks!
 */
function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.cardContainer}>
        <Card />
      </View>
      <View style={styles.contentContainer}>
        <WhiteBox />
      </View>
    </View>
  );
}

// Add the EmptyScreen component
function EmptyScreen() {
  return (
    <View style={styles.container}>
      <Text>Placeholder screen</Text>
    </View>
  );
}

function Footer({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.footer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const icon = options.tabBarIcon;

        return (
          <View key={index} style={styles.footerItem}>
            {route.name === "Home" ? (
              <Image source={require(DiscoverIcon)} style={styles.footerIcon} />
            ) : route.name === "Matches" ? (
              <Image source={require(HeartIcon)} style={styles.footerIcon} />
            ) : (
              <Image source={require(MessagesIcon)} style={styles.footerIcon} />
            )}
            <Text style={styles.footerText}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Sydney: require("./assets/Fonts/Sydney-Serial-Regular.ttf"),
    "Sydney-Bold": require("./assets/Fonts/Sydney-Serial-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          // Update the Tab.Navigator with custom tabBar and screenOptions
          tabBar={(props) => <Footer {...props} />}
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === "Home") {
                return DiscoverIcon;
              } else if (route.name === "Matches") {
                return HeartIcon;
              } else if (route.name === "DMs") {
                return MessagesIcon;
              }
            },
            tabBarLabel: () => {
              if (route.name === "Home") {
                return "Discover";
              } else if (route.name === "Matches") {
                return "Matches";
              } else if (route.name === "DMs") {
                return "DMs";
              }
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Matches" component={EmptyScreen} />
          <Tab.Screen name="DMs" component={EmptyScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 100,
  },
  contentContainer: {
    flex: 0.5,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontFamily: "Sydney-Bold",
    fontSize: 30,
    color: "black",
  },
  headerContainer: {
    alignSelf: "stretch",
    marginTop: 0, //StatusBar.currentHeight, // Add this line to account for the device's status bar height
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 400,
  },
  cardTopLeftText: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 30,
    color: "white",
    fontFamily: "Sydney-Bold",
  },
  cardBottomLeftText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontSize: 18,
    fontFamily: "Sydney",
  },
  footer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "black",
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  footerText: {
    fontFamily: "Sydney",
    color: "white",
  },
  whiteBox: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    marginTop: 50,
    alignItems: "flex-start",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.95,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whiteBoxTitle: {
    fontFamily: "Sydney-Bold",
    fontSize: 24,
    color: "black",
    marginBottom: 10,
  },
  whiteBoxIcon: {
    width: 48,
    height: 48,
  },
  playerIcon: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  whiteBoxContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  playerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  audioWaveformIcon: {
    flex: 0.9,
    resizeMode: "contain",
  },
  audioWaveWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
