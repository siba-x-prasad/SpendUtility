import { StyleSheet } from "react-native";
import { Appearance } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = (Dimensions.get('window').width);
const screenHeight = (Dimensions.get('window').height);

const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // Use dark color scheme
}


const globalStyles = StyleSheet.create({
  dashboardItemcontainer: {
    flex : 1,
    width : '100%',
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    padding: 8,
    margin : 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
},
  baseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: 'center'
  },
  appText: {
    height: 50,
    alignSelf: 'center',
    padding: 10,
    color: "#fff"
  },
  appInput: {
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 18,
    borderRadius: 6,
    flexDirection: 'row',
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#d3d3d3',
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  itemContainerText: {
    flex: 2,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  button: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'black',
    padding: 10,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    width: '80%',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  errorMessage: {
    width: '80%',
    fontSize: 10,
    color: "red",
    marginStart: 10,
  }

});

export default globalStyles;