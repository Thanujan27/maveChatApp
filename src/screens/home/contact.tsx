import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DrawerIcon from '../../../assets/svg/DrawerIcon';
import PlusIcon from '../../../assets/svg/PlusIcon';
import settingIcon from '../../../assets/svg/settingsIcon';
import {useNavigation} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import {
  CheckPhoneNumbers,
  GetUserDetails,
  NewChat,
} from '../../Api Calls/Authentication';
import {dispatch, useSelector} from '../../../redux/store';
import {updateContactName, updateProfileId, updateReceiverId, updateReceiverIds} from '../../../redux/slices/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContactsScreen() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
  })
    .then(res => {
      console.log('Permission: ', res);
      Contacts.getAll()
        .then(contacts => {
          // work with contacts
          console.log(contacts);
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch(error => {
      console.error('Permission error: ', error);
    });

  const navigation: any = useNavigation();

  const handleOnChangeText = (text: any) => {
    setInput(text);
  };
  const handleChatClick = (text: any) => {
    navigation.navigate('MainDrawer');
  };

  const [input, setInput] = useState('');

  const styles = StyleSheet.create({
    scrollViewContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 8, // Adjust padding as needed
    },
    contentContainer: {
      flexGrow: 1, // Ensures content fills the available height
    },
  });

  const [allPhoneNumbers, setAllPhoneNumbers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const MaveNumbers = useSelector((state: any) => state?.language?.maveNumbers);
  const NonMaveNumbers = useSelector((state: any) => state?.language?.nonMaveNumbers);

  const [matchingPhoneNumbers, setMatchingPhoneNumbers] = useState([]);
  const [nonMatchingPhoneNumbers, setNonMatchingPhoneNumbers] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const allContacts: any = await Contacts.getAll();
        setContacts(allContacts);

 
  
  

        //  console.log('dfsjdfhjskdfhksjdfhjk', results);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
    // getData();
  }, []);

  // const getData = async () => {
  //   try {
  //     const results: any = await CheckPhoneNumbers(allPhoneNumbers);
  //     console.log('dfsjdfhjskdfhksjdfhjk', results);
  //   } catch (error: any) {}
  // };
//   AsyncStorage.getItem('user_id').then((storedUserId) => {
//     dispatch(updateProfileId(storedUserId));

//     console.log('sssssaaaaaaaaaaaaa', storedUserId);
// }); 

const ProfileId = useSelector((state: any) => state?.language?.profileId);


  const handleContactPress = async (
    Name: any,
    phoneNumber: any,
    receiverProfileId: any,
  ) => {
    dispatch(updateReceiverId(receiverProfileId));
    
    // AsyncStorage.setItem('receiverID', JSON.stringify(receiverProfileId));
    // await AsyncStorage.setItem('receiverID', receiverProfileId.toString());

    // // Retrieve all stored receiver IDs from AsyncStorage
    // const storedReceiverIDs = await AsyncStorage.getItem('receiverIDs');
  
    // // Parse the stored IDs into an array if they exist
    // let receiverIDArray = storedReceiverIDs ? JSON.parse(storedReceiverIDs) : [];
    // receiverIDArray.push(receiverProfileId);
    // await AsyncStorage.setItem('receiverIDs', JSON.stringify(receiverIDArray));

    // dispatch(updateReceiverIds(receiverIDArray));

    // if (storedReceiverIDs !== null) {
    //   receiverIDArray = JSON.parse(storedReceiverIDs);
    //   dispatch(updateReceiverIds(receiverIDArray));

    // }
  
    // // Check if the current receiver ID is already in the array
    // if (!receiverIDArray.includes(receiverProfileId)) {
    //   // Add the current receiver ID to the array
    //   receiverIDArray.push(receiverProfileId);
    //   dispatch(updateReceiverIds(receiverIDArray));

  
    //   // Store the updated array back in AsyncStorage
    //   await AsyncStorage.setItem('receiverIDs', JSON.stringify(receiverIDArray));
    // }

    console.log(Name,phoneNumber,receiverProfileId,'ssssssssssssssssssssssssssss')
    try {
      const NewChatCreate: any = await NewChat(
        ProfileId,
        "string",
        receiverProfileId,
        'receiverProfileUrl',
        'PERSONAL_TO_PERSONAL',
        'PERSONAL',
      );
console.log(NewChatCreate)
      // setContacts(allContacts);

      // const phoneNumbers = allContacts.flatMap(
      //   (contact: {phoneNumbers: any[]}) =>
      //     contact.phoneNumbers.map(phone => phone.number),
      // );
      // setAllPhoneNumbers(phoneNumbers);
      //  console.log('phoneNumbersphoneNumbers',phoneNumbers,MaveNumbers)

      //  const matchingNumbers = phoneNumbers.filter((Number:any) =>
      //   MaveNumbers.includes(Number)
      // );
      // const nonMatchingNumbers = phoneNumbers.filter(
      //   (Number:any) => !MaveNumbers.includes(Number)
      // );

      // setMatchingPhoneNumbers(matchingNumbers);
      // setNonMatchingPhoneNumbers(nonMatchingNumbers);
      //  const results: any = await CheckPhoneNumbers(allPhoneNumbers);

      //  console.log('dfsjdfhjskdfhksjdfhjk', results);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
   navigation.navigate('SingleChat');

    dispatch(updateContactName(Name));

    // Handle contact selection or other actions here
    console.log('Contacts:', Name, phoneNumber);
  };
  const MaverenderContactItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          handleContactPress(
            item?.ContactName,
            item?.phoneNumber,
            item?.ProfileId,
          )
        } // Corrected onPress syntax
        className="gap-3 mx-1 self-start p-2 flex-row justify-start items-center w-full flex">
        <Image
          source={require('../../../assets/images/contactImage.png')}
          className="w-11 h-11"
        />
        <Text className="text-[#0F1828] text-sm font-semibold mx-3 p-2">{item.displayName}</Text>

        {/* Add other contact details as needed */}
      </TouchableOpacity>
    );
  };
  const renderContactItem = ({item}: any) => {
    return (
      <TouchableOpacity
        // onPress={() =>
        //   handleContactPress(
        //     item?.ContactName,
        //     item?.phoneNumber,
        //     item?.profileId,
        //   )
        // } // Corrected onPress syntax
        className="gap-3 mx-1 self-start p-2 flex-row justify-start items-center w-full flex">
        <Image
          source={require('../../../assets/images/contactImage.png')}
          className="w-11 h-11"
        />
        <Text className="text-[#0F1828] text-sm font-semibold mx-3 p-2">{item.ContactName}</Text>
        <Text className="flex-end flex-1 text-black text-sm content-end text-right self-end items-end justify-end w-full  mx-3 p-2">Invite</Text>

        {/* Add other contact details as needed */}
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex flex-1 w-full bg-white">
      {/* header */}

      <View className="flex flex-row items-center justify-start  ">
        <View className="flex flex-row items-center justify-start mx-1 my-2">
          <TouchableOpacity onPress={handleChatClick}>
            <Image
              source={require('../../../assets/images/backbutton.png')}
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-lg font-normal ml-2 text-black">
              Select contact
            </Text>
            <Text className="text-xs font-normal ml-2 text-black">
              183 contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex items-center w-full my-4 ">
          {/* <View className="w-full border-t-2 border-black "/> */}
          <TextInput
            placeholder="Search"
            // inlineImagePadding={2}
            // inlineImageLeft={'SearchIcon.png'}
            placeholderTextColor={'#ADB5BD'}
            onChangeText={handleOnChangeText}
            value={input}
            className="w-11/12 bg-[#F7F7FC] rounded-lg p-2"
          />
          </View>
      <View className="w-full">
        <Text className="text-black font-medium mx-3 text-start justify-center my-3">
          Contacts on Mave
        </Text>
      </View>
      <View className="w-full flex mx-4 self-center ">
        <FlatList
          data={contacts}
          renderItem={MaverenderContactItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
      <View className="w-full">
        <Text className="text-black font-medium mx-3 text-start justify-center my-3">
          Invite to Mave
        </Text>
      </View>
      <View className="w-full flex mx-4 self-center ">
        <FlatList
          data={NonMaveNumbers}
          renderItem={renderContactItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
}
