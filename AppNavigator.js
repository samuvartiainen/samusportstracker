import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import registerPage from "./RegisterPage.js";
import loginPage from "./LoginPage.js";
import pwChangePage from "./PwChangePage.js";
import mainPage from "./MainPage.js";
import splashScreen from "./SplashScreen";
import newExercisePage from './NewExercisePage.js';
import editExercisePage from './EditExercisePage.js';
import settingsPage from './SettingsPage.js';
import appInformation from './AppInformation.js';

const AppNavigator = createStackNavigator ({
    Login: loginPage,
    Register: registerPage,
    PwChange: pwChangePage,
    Main: mainPage,
    Splash: splashScreen,
    NewExercise: newExercisePage,
    EditExercise: editExercisePage,
    Settings: settingsPage,
    Information: appInformation
  },
  {
      initialRouteName: "Splash"
  },
  
);
console.disableYellowBox = true;
export default createAppContainer(AppNavigator);