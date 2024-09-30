import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '../../redux/store';
import {useEffect, useState} from 'react';
import GetStarted from '../screens/Marekting/getStarted';
import Login from '../screens/authentication/login';
import OtpVerification from '../screens/authentication/otpVerification';
import Signup from '../screens/authentication/signup';
import MainDrawer from '../screens/home/homeRoute';
import SIngleChat from '../screens/Chat/singleChat';
import {NavigationContainer} from '@react-navigation/native';
import ContactsScreen from '../screens/home/contact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native-svg';
import Settings from '../screens/settings';
import Home from '../screens/home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (storedUserId) {
          setIsSignedIn(true);
          // dispatch(updateProfileId(storedUserId));
          console.log('sssssaaaaaaaaaaaaaaa', storedUserId, isSignedIn);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    //    fetchUserId();
  }, []);
  function NonAuthScreens() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="MainDrawer">
        <Stack.Screen name="MainDrawer">
          {(props: any) => <MainDrawer {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SingleChat">
          {(props: any) => <SIngleChat {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ContactsScreen">
          {(props: any) => <ContactsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function AuthScreens() {
    return (
      <>
        <Tab.Navigator
          // tabBar={props => <AnimatedTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home">
          <Tab.Screen
            name="Home"
            options={{
              tabBarShowLabel: true,
              headerShown: false,
              tabBarLabel: 'Messages', // Adjust label text as needed
              // tabBarLabelPosition: 'below-icon',
              tabBarLabelStyle: {
                fontSize: 12, // Adjust font size as needed
                color: 'black',
                textAlign: 'center',
                fontWeight: '600',
              },
              // tabBarIcon: ({ focused, color, size }) => (
              //   <Image
              //     source={require('../../assets/images/messages.png')} // Replace with your SVG path
              //     style={{ width: 24, height: 24, tintColor: 'black' }}
              //   />
              // ),
            }}>
            {(props: any) => <MainDrawer {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Settings"
            options={
              {
                // @ts-ignore
                // tabBarIcon: ({ref}) => (
                //   <Lottie
                //     ref={ref}
                //     loop={false}
                //     source={require('../../assets/lottie/upload.icon.json')}
                //     style={styles.icon}
                //   />
                // ),
              }
            }>
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="menu3"
            options={
              {
                // @ts-ignore
                // tabBarIcon: ({ref}) => (
                //   // <Lottie
                //   //   ref={ref}
                //   //   loop={false}
                //   //   source={require('../../assets/lottie/chat.icon.json')}
                //   //   style={styles.icon}
                //   // />
                // ),
              }
            }>
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="menu4"
            options={
              {
                // @ts-ignore
                // tabBarIcon: ({ref}) => (
                //   <Lottie
                //     ref={ref}
                //     loop={false}
                //     source={require('../../assets/lottie/settings.icon.json')}
                //     style={styles.icon}
                //   />
                // ),
              }
            }>
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="menu5"
            options={
              {
                // @ts-ignore
                // tabBarIcon: ({ref}) => (
                //   <Lottie
                //     ref={ref}
                //     loop={false}
                //     source={require('../../assets/lottie/settings.icon.json')}
                //     style={styles.icon}
                //   />
                // ),
              }
            }>
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
        {/* <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={isSignedIn ? ("MainDrawer" ) : ( 'MainDrawer' )}>
        <Stack.Screen name="GetStarted">
          {(props: any) => <GetStarted {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props: any) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="OtpVerification">
          {(props: any) => <OtpVerification {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {(props: any) => <Signup {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MainDrawer">
          {(props: any) => <MainDrawer {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SingleChat">
          {(props: any) => <SIngleChat {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ContactsScreen">
          {(props: any) => <ContactsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator> */}
      </>
    );
  }
  return (
    <>
      <ReduxProvider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isSignedIn ? (
            <Stack.Screen name="MainDrawer">
              {(props: any) => <AuthScreens {...props} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="GetStarted">
              {(props: any) => <AuthScreens {...props} />}
            </Stack.Screen>
          )}
          <Stack.Screen name="Login">
            {(props: any) => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="OtpVerification">
            {(props: any) => <OtpVerification {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {(props: any) => <Signup {...props} />}
          </Stack.Screen>
          <Stack.Screen name="MainDrawer">
            {(props: any) => <MainDrawer {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SingleChat">
            {(props: any) => <SIngleChat {...props} />}
          </Stack.Screen>
          <Stack.Screen name="ContactsScreen">
            {(props: any) => <ContactsScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </ReduxProvider>
    </>
  );
}
