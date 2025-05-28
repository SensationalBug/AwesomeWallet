import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Views import
import Overview from './views/Overview';
import Transaction from './views/Transaction';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator initialRouteName="Overview">
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
