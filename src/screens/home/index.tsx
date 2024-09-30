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
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DrawerIcon from '../../../assets/svg/DrawerIcon';
import PlusIcon from '../../../assets/svg/PlusIcon';
import settingIcon from '../../../assets/svg/settingsIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import {
  CheckPhoneNumbers,
  dashboardChats,
  getUserDetails,
} from '../../Api Calls/Authentication';
import {dispatch, useSelector} from '../../../redux/store';
import {
  updateContactName,
  updateMaveNumbers,
  updateNonMaveNumbers,
  updateProfileId,
  updateReceiverId,
} from '../../../redux/slices/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Home() {
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
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (storedUserId) {
          dispatch(updateProfileId(storedUserId));
          console.log('sssssaaaaaaaaaaaaaaa', storedUserId);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [isFocused]);
  const handleOnChangeText = (text: any) => {
    setInput(text);
  };
  const handleChatClick = (text: any, profileID: any) => {
    dispatch(updateContactName(text));
    dispatch(updateReceiverId(profileID));

    navigation.navigate('SingleChat');
  };
  const [storedUpdatedData, setStoredUpdatedData] = useState([]);

  const [input, setInput] = useState('');
  const [receiverId, setReceiverId] = useState([]);
  const [loading, setLoading] = React.useState(true);

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
  const ReceiverIds = useSelector((state: any) => state?.language?.receiverIds);

  const getUserDetail = async (ids: number[]) => {
    // setIsOTPButtonDiable(true);
    try {
      const results: any = await Promise.all(
        ids.map((id: any) => getUserDetails(id)),
      );
      // setReceiverId(results)
      console.log(results, 'getUserDetailssss');
    } catch (error) {}
  };

  const [accountNumbers, setAccountNumbers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const ProfileId = useSelector((state: any) => state?.language?.profileId);

  useEffect(() => {
    const AllChats = async () => {
      try {
        const Chats: any = await dashboardChats(ProfileId);

        console.log(Chats, 'dashboardChats');
        setReceiverId(Chats);
      } catch {}
    };

    const fetchContacts = async () => {
      try {
        const allContacts: any = await Contacts.getAll();
        setContacts(allContacts);
        console.log(allContacts[0].phoneNumbers, 'ssssssssssssssssssss');

        const phoneNumbers = allContacts.flatMap((contact: any) =>
          contact.phoneNumbers.map((phone: any) => ({
            name: contact.displayName,
            phoneNumber: phone.number.replace(/\D/g, ''),
          })),
        );

        // setAllPhoneNumbers(phoneNumbers);

        console.log('phoneNumsbersphonedNumbers', phoneNumbers);
        const results: any = await CheckPhoneNumbers(phoneNumbers);
        console.log('resultsresults', results);

        const falseNumbers: any = results
          .filter((item: {isAccountAvailable: any}) => !item.isAccountAvailable)
          .map((item: {contactName: any; phoneNumber: any}) => ({
            ContactName: item.contactName,
            phoneNumber: item.phoneNumber,
          }));
        dispatch(updateNonMaveNumbers(falseNumbers));

        console.log('falseNumbersfalseNumbers', falseNumbers);

        const AccountNumbers: any = results
          .filter((item: {isAccountAvailable: any}) => item.isAccountAvailable)
          .map(
            (item: {profileId: any; contactName: any; phoneNumber: any}) => ({
              ContactName: item.contactName,
              phoneNumber: item.phoneNumber,
              ProfileId: item.profileId,
            }),
          );
        setAccountNumbers(AccountNumbers);

        console.log('AccountNumbersAccountNumbers', AccountNumbers);
        dispatch(updateMaveNumbers(AccountNumbers));
        // dispatch(updateReceiverId(AccountNumbers));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    storeUpdatedData();

    AllChats();
    fetchContacts();
    getUserDetail(ReceiverIds);
    // getData();
  }, [isFocused]);
  // const AccountNumbers: any = receiverId
  //         .filter((item: {isAccountAvailable: any}) => item.isAccountAvailable)
  //         .map(
  //           (item: {profileId: any; contactName: any; phoneNumber: any}) => ({
  //             ContactName: item.contactName,
  //             phoneNumber: item.phoneNumber,
  //             ProfileId: item.profileId,
  //           }),
  //         );

  const handleContactPress = () => {
    // Handle contact selection or other actions here
    navigation.navigate('ContactsScreen');
    console.log('Contacts:', contacts);
  };

  const getContactNameByProfileId = (profileId: any) => {
    const user: any = accountNumbers.find(
      (user: any) => user.ProfileId === profileId,
    );
    return user ? user.ContactName : 'Unknown';
  };

  const updatedData = receiverId.map((chat: any) => ({
    ...chat,
    participants: chat.participants.map((participant: any) => ({
      ...participant,
      contactName: getContactNameByProfileId(participant.profileId),
    })),
  }));

  const storeUpdatedData = async () => {
    try {
      await AsyncStorage.setItem('updatedData', JSON.stringify(updatedData));
      console.log('Updated data stored successfully');
    } catch (error) {
      console.error('Error storing updated data:', error);
    }
  };
  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('updatedData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setStoredUpdatedData(parsedData);
          setLoading(false);
          console.log(parsedData, 'sssssss');
        }
      } catch (error) {
        console.error('Error fetching stored data:', error);
      }
    };

    fetchStoredData();
  }, [isFocused]);

  console.log(updatedData, 'updatedDataupdatedData');

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        size="large"
        color="#000"
      />
    );
  }

  
  return (
    <View className=" flex flex-1 w-screen items-center  self-center content-center  bg-white">
      {/* Serach Bar */}
      <View className="w-full bg-[#FFFFFF]] items-start justify-center flex">
        <View className="w-11/12   mx-3 items-start justify-center flex self-center "></View>
      </View>

      {/* Chats */}
      {/* <TouchableOpacity
        onPress={handleContactPress}
        className="bg-white h-8 w-8 absolute bottom-20 right-14 z-50">
        <PlusIcon />
      </TouchableOpacity> */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center w-full my-4 ">
          {/* <View className="w-full border-t-2 border-black "/> */}
          <TextInput
            placeholder="Search"
            // inlineImagePadding={2}
            // inlineImageLeft={'SearchIcon.png'}
            placeholderTextColor={'black'}
            onChangeText={handleOnChangeText}
            value={input}
            className="w-11/12 bg-[#F7F7FC] rounded-lg p-2"
          />
          <FlatList
            data={storedUpdatedData}
            renderItem={({item}: any) => (
              <TouchableOpacity
                onPress={() =>
                  handleChatClick(
                    item.participants[1].contactName,
                    item.participants[1].profileId,
                  )
                }
                className="w-[95%]  flex-row items-center self-center content-center justify-between  my-3 border-gray-300 p-1 ">
                <View className="flex-row gap-5 items-center justify-center">
                  <View className="relative">
                  <Image
                    source={require('../../../assets/images/contactImage.png')}
                    // className="w-16 h-16"
                    style={{width: 48, height: 48}}
                  />
            <View className="absolute -bottom-0.5 -right-0.5 bg-[#2CC069] rounded-full w-4 h-4 border-2 border-white" />
                  </View>
                  <View>
                    <Text className="font-semibold text-black text-[16px] font-">
                      {item.participants[1].contactName}
                    </Text>
                    <Text className=" font-normal text-[#ADB5BD] text-sm">
                      {item.lastMessage || 'No messages'}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-black text-xs font-semibold">
                    {moment(item.createdAt).format('HH:mm')}
                  </Text>

                  {'item.isSeen' ? (
                    <Image
                      source={require('../../../assets/images/tickicon.png')}
                      className="w-5 h-2 mt-1"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
            // keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}
