import 'react-native-gesture-handler'
import * as React from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Home from '.';
import DrawerIcon from '../../../assets/svg/DrawerIcon';
import { getUserDetails } from '../../Api Calls/Authentication';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NotificationsScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  const navigation: any = useNavigation();

  const [userName, setUserName] = React.useState('Mave');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (storedUserId) {
          const results: any = await  getUserDetails(storedUserId)
          console.log('sssssaaaaaaassaaaaaaaa', results);

          setUserName(results?.userName)
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

     fetchUserId();
  }, []);
   const handleContactPress = () => {
    // Handle contact selection or other actions here
    navigation.navigate('ContactsScreen');
    console.log('first')
  };

 
  return (

    <Drawer.Navigator
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'flex-start',
              marginLeft: 18,
              alignItems: 'flex-start',
              marginTop: 18,
              marginBottom: 18,
              gap: 6,
              flexDirection: 'column',
            }}>
            <Image
              source={require('../../../assets/images/person1.png')} // Replace with your image path
              style={{width: 70, height: 70, borderRadius: 35}}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 400,
                color: 'black',
                marginTop:18
              }}>
              {userName}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 400,
                // color: 'gray',
              }}>
              +94 776419919
            </Text>
            {/* <View style={{width:'98%',height:1,marginTop:8, backgroundColor:'black',alignSelf:'center'}}/> */}
          </View>
          <DrawerItemList {...props} />
          <View
            style={{
              flex: 1,
              alignContent: 'flex-end',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: 18,
              marginBottom: 18,
              gap: 8,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 400,
                color: 'black',
              }}>
              + Create New Buisness Profile
            </Text>
          </View>
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#000',
        drawerActiveBackgroundColor: '#ff5b00',
        drawerInactiveBackgroundColor: 'white',
        drawerItemStyle: {},
        drawerStyle: {
          width: Dimensions.get('window').width / 1.2, // Adjust the width as needed
        },
        drawerContentStyle:{width:'80%'},
        headerStyle: styles.headerbackgroundContainer,
        
        headerRight: () => (
          <View className='flex flex-row'>
            <TouchableOpacity
                    onPress={handleContactPress}

            >
            <Image
              source={require('../../../assets/images/Icon.png')} // Replace with your image path
              // Replace with your settings icon path
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
                alignSelf: 'center',
              }}
            />
            
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Handle right icon press */
            }}>
            <Image
              source={require('../../../assets/images/notifications_none.png')} // Replace with your image path
              // Replace with your settings icon path
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
                alignSelf: 'center',
              }}
            />
            
          </TouchableOpacity>
          </View>
          
          
          
        ),
      }}>
      <Drawer.Screen
        name='Mave'
        component={Home}
        options={{drawerLabel: 'Personal Profile',
          
        }}
      />
      <Drawer.Screen
        name="Business Profile 1- Admin"
        component={NotificationsScreen}
      />
      <Drawer.Screen
        name="Business Profile 2- member"
        component={NotificationsScreen}
      />
    </Drawer.Navigator>
    
  );
}
const styles = StyleSheet.create({
  headerLeftContainer: {
    // Your custom styles here
    marginLeft: '1%', // Add margin left for spacing
    // marginRight: '4%', // Add margin left for spacing

    justifyContent: 'center', // Center the icon vertically
    alignContent: 'center',
    // backgroundColor:'red'
  },
  headerRightContainer: {
    // Your custom styles here
    marginLeft: '5%', // Add margin left for spacing
    marginRight: '4%', // Add margin left for spacing

    justifyContent: 'center', // Center the icon vertically
    alignContent: 'flex-end',
    // backgroundColor:'red'
  },
  headerbackgroundContainer: {
    // Your custom styles here

    // justifyContent: 'center', // Center the icon vertically
    // alignContent:'flex-end',
    backgroundColor: '#FFFFFF',
  },
  drawerLabel: {
    color: 'black', // Change to your desired text color
  },
});
