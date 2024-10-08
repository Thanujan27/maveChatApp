import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as ReduxProvider, useSelector} from 'react-redux';
import {dispatch, store} from '../../redux/store';
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
import Settings from '../screens/settings';
import Home from '../screens/home';
import {Image} from 'react-native';
import { Provider } from 'react-redux';
import { updateProfileId } from '../../redux/slices/languageSlice';
import HomeIcon from '../../assets/BottomIcons/Home';
import RoutesIcon from '../../assets/BottomIcons/Routes';

import ProfileIcon from '../../assets/BottomIcons/ProfileIcon';


const Stack = createNativeStackNavigator();
const Tab: any = createBottomTabNavigator();

export default function Navigation() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const SignIn = useSelector((state: any) => state?.language?.isSignIn);
  console.log(isSignedIn, SignIn,'isSignedIn');

  useEffect(() => {
    
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (SignIn || storedUserId) {
          setIsSignedIn(true);
           dispatch(updateProfileId(storedUserId));
          console.log('sssssaaaaaaaaadaaaaaa', storedUserId, isSignedIn);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [isSignedIn,SignIn]);

  function HomeScreens() {
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
  function AuthScreen() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted">
          {(props: any) => <GetStarted {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props: any) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {(props: any) => <Signup {...props} />}
        </Stack.Screen>
        <Stack.Screen name="OtpVerification">
          {(props: any) => <OtpVerification {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function TabNavigator() {
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
            component={HomeScreens}
            options={{
              tabBarShowLabel: true,
              headerShown: false,
              //    tabBarLabel: 'Messages', // Adjust label text as needed
              // tabBarLabelPosition: 'below-icon',
              tabBarLabelStyle: {
                fontSize: 12, // Adjust font size as needed
                color: 'black',
                textAlign: 'center',
                fontWeight: '600',
              },
              tabBarIcon: ({focused}:any) => <HomeIcon focused={focused} />,
            }}>
            {/* {(props: any) => <MainDrawer {...props} />} */}
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
                tabBarLabelStyle: {
                  fontSize: 12, // Adjust font size as needed
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: '600',
                  
                },
                tabBarIcon: ({focused}:any) => <ProfileIcon focused={focused} />,
              }
            }>
              
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Contacts"
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
                tabBarIcon: ({focused}) => <RoutesIcon focused={focused} />,

              }
            }>
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Notifications"
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
                tabBarIcon: ({focused}) => <RoutesIcon focused={focused} />,

              }
            }>
            {(props: any) => <Settings {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
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
            <Stack.Screen name="TabScreen">
              {(props: any) => <TabNavigator {...props} />}
            </Stack.Screen>
          ) : (

            <Stack.Screen name="AuthScreen">
              {(props: any) => <AuthScreen {...props} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </ReduxProvider>
    </>
  );
}
