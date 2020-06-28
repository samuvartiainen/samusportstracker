import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import registerPage from "./RegisterPage.js";
import loginPage from "./LoginPage.js";
import pwChangePage from "./PwChangePage.js";
import mainPage from "./MainPage.js";
import splashScreen from "./SplashScreen";
import newExercisePage from './NewExercisePage.js';
import editExercisePage from './EditExercisePage.js';
import settingsPage from './SettingsPage.js';
import appInformation from './AppInformation.js';

const AppNavigator = createStackNavigator({
  Register: registerPage,
  PwChange: pwChangePage,
  Splash: splashScreen,
  NewExercise: newExercisePage,
  EditExercise: editExercisePage,
  Login: loginPage,
  Home: {
    screen: createMaterialTopTabNavigator({
      Main: {
        screen: mainPage,
        navigationOptions: ({ navigation }) => ({
          title: 'Own exercises',
        }),
      },
      Settings: {
        screen: settingsPage,
        navigationOptions: ({ navigation }) => ({
          title: 'Settings',
        }),
      },
      Information: {
        screen: appInformation,
        navigationOptions: ({ navigation }) => ({
          title: 'App information',
        }),
      },
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),

    }),
  },
},
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Samusportstracker',
      headerStyle: {
        backgroundColor: '#66d9ff',
      },
      titleStyle: {
        color: '#FFFFFF'
      },
    }),
  });
export default createAppContainer(AppNavigator);