import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  Platform,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Client, over} from 'stompjs';
import SockJS from 'sockjs-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dispatch} from '../../../redux/store';
import {updateProfileId} from '../../../redux/slices/languageSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import data from './list.json';
import ImagePicker from 'react-native-image-crop-picker';
import {mediaImageUpload} from '../../Api Calls/Authentication';

var stompClient: Client;

export default function SIngleChat() {
  // AsyncStorage.getItem('user_id').then(storedUserId => {
  //   dispatch(updateProfileId(storedUserId));

  //   console.log('sssssaaaaaaaaaaaaa', storedUserId);
  // });
  const ProfileId = useSelector((state: any) => state?.language?.profileId);
  const ReceiverId = useSelector((state: any) => state?.language?.receiverId);
  console.log(ProfileId, ReceiverId, 'ssssssssssaaaaaaaaaaaaa');
  const refRBSheet = useRef();
  // const ReceiverId = 2;
  const senderId = ProfileId;
  console.log(senderId, 'ssssssaassssssss');

  const flatListRef = useRef<FlatList<any> | null>(null);
  const refStandard: any = useRef();
  const [storedChats, setStoredChats] = useState<any>({});
  console.log('sdkjfskjdfjksd', storedChats);
  const navigation: any = useNavigation();
  const [userData, setUserData] = useState<any>({});
  const [chatarray, setchatarray] = useState<any[]>([]);
  console.log(chatarray,'chatarraychatarray')
  const image = {
    uri: 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png',
  };

  const handleChatClick = (text: any) => {
    navigation.navigate('MainDrawer');
  };
  const [isVisible, setIsVisible] = useState(false);
  const [button, setButton] = useState(false);
  const [photo, setPhoto] = React.useState<string | null>(null);

  // Function to toggle the modal visibility

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      setPhoto(image.path);
      let imageUri = image.path;

      console.log(image.path);

      await mediaImageUpload(
        'chat9d',
        ReceiverId,
        ProfileId,
        imageUri,
        'string',
        '',
      ).then((data: any) => {
        console.log('valuedadasddasd', data);
      });
    });
  };
  useEffect(() => {
    // ... other useEffect logic

    const fetchStoredChats = async () => {
      try {
        const storedData = await AsyncStorage.getItem('chats');

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Retrieve the chat array directly under the ReceiverId key
          const retrievedChats = parsedData[ReceiverId];

          if (retrievedChats) {
            const finalArray = chatarray.concat(retrievedChats);
            console.log(finalArray, 'finalArray');
            //  setchatarray([...finalArray]);
          }
        }
        // if (storedData) {
        //   const parsedData = JSON.parse(storedData);
        //    console.log(parsedData,'storedDatastoredDatastoredData')

        //   setStoredChats(parsedData);
        // }
      } catch (error) {
        console.error('Error fetching stored chats:', error);
      }
    };

    // fetchStoredChats();
    // storeChat();
  }, [userData]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const ContactName = useSelector((state: any) => state?.language?.contactName);

  
  const newContact = {
    name: ContactName,
    profileId: ReceiverId
  };
  
  useEffect(() => {
    const storeChat = async () => {
      try {
        if (chatarray.length > 0) { // Check if chatarray is not empty
          // const existingChats = await AsyncStorage.getItem('contactName');
          // let ContactNames = existingChats ? JSON.parse(existingChats) : {};
          console.log('firstaa')
          const existingContacts = await AsyncStorage.getItem('contactNamesWithProfileIds');
          let contactNames = existingContacts ? JSON.parse(existingContacts) : [];
    console.log(contactNames,'contactNamescontactNames')
          // Add the new ContactName to the array
          contactNames.push(newContact);
    
          // Store the updated array back to AsyncStorage
          await AsyncStorage.setItem('contactNamesWithProfileIds', JSON.stringify(contactNames));
        }
      } catch (error) {
        console.error('Error storing chat data', error);
      }
    };
      // Update the document title using the browser API
    connect();
    storeChat();
  }, [chatarray]);

  const connect = () => {
    let Sock = new SockJS(`http://3.109.218.138:8088/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected);
  };

  const onConnected = () => {
    setUserData({...userData});

    stompClient.subscribe(
      `/chat-app/receiver/${ProfileId}/private-message`,
      onPrivateMessage,
    );
  };

  const sendPrivateValue = (message?: string) => {
    if (stompClient) {
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const day = currentTime.getDate().toString().padStart(2, '0');
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const seconds = currentTime.getSeconds().toString().padStart(2, '0');
      var chatMessage;
      chatMessage = {
        chatId: 'chat9d',
        messageId: '123hfid4r',
        message: userData.message,
      };
    }
    stompClient.send(
      `/chat-app/${ProfileId}/private-message/${ReceiverId}`,
      {}, // Headers
      JSON.stringify(chatMessage),
    );

    setUserData((prevUserData: any) => ({...prevUserData, message: ''}));
    setchatarray([...chatarray, chatMessage]);
    // let chatMsgs = [...chatarray, chatMessage];
    // AsyncStorage.setItem(`chats${ReceiverId}`, JSON.stringify(chatMsgs));

    // console.log(chatMsgs, 'chatMsgschatMsgs');
    // scrollToBottom();

    // console.log(chatarray, 'aaaaaaaaachatmessage');

    // chatarray.push(chatMessage);

    // setchatarray(chatarray);
  };

  const onPrivateMessage = (payload: {body: string}) => {
    var payloadData = JSON.parse(payload.body);
    // payloadData.createdAt = payloadData.createdAt;
    console.log('payloadDatapayloadDataaa', payloadData);

    setchatarray((prevChatArray: any) => [...prevChatArray, payloadData]);
    // scrollToBottom();
    console.log('payloadDataaaaaaaaaaaaaaaaaaaaaa', chatarray);
    stompClient.send('/app/change-status', {}, JSON.stringify(payloadData));

    // if (privateChats.get(payloadData.senderId)) {
    //   privateChats.set(payloadData.senderId, payloadData.messages);
    //   setPrivateChats(new Map(privateChats));
    // } else {
    //   let list = [];
    //   list.push(payloadData);
    //   privateChats.set(payloadData.senderId, list);
    //   setPrivateChats(new Map(privateChats));
    // }
  };

  const handleMessage = (value: string) => {
    if (value.trim() === '') {
      setButton(false); // If the input is empty, disable the button
    } else {
      setButton(true); // If the input has text, enable the button
    }
    setUserData({...userData, message: value});
  };
  
  const storeChat = async () => {
    try {
      const existingChats = await AsyncStorage.getItem('chats');
      let chats = existingChats ? JSON.parse(existingChats) : {};

      chats[ReceiverId] = chatarray; // Store the messages for the contactId
      console.log('chatarraychatarray', chatarray);
      await AsyncStorage.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error storing chat data', error);
    }
  };

  const renderItem = ({item}: any) => (
    <View
      style={{
        marginVertical: 5,
        alignItems:
          item?.senderProfileId === item?.receiverProfileId
            ? 'flex-end'
            : 'flex-start',
        paddingHorizontal: 8,
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10,
        }}>
        <View
          style={[
            styles.containerchat,
            item?.senderProfileId === item?.receiverProfileId
              ? styles.driverContainer
              : styles.riderContainer,
          ]}>
          {/* if (item?.contentType === 'MEDIA')
          {
            <Image
              source={{
                uri: 'https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png',
              }}
              style={{width: 200, height: 200}}
            />
          } */}
          {item?.contentType === 'MEDIA' && (
            <Image
              source={{
                uri: item?.message,
              }}
              style={{width: 200, height: 200}}
            />
          )}
          {item?.senderProfileId === item?.receiverProfileId && (
            <Text className='text-white font-semibold text-sm  '>{item?.message}</Text>
          )}
          {item?.senderProfileId !== item?.receiverProfileId && (
            <Text className='text-[#0F1828] font-normal text-sm  '>{item?.message}</Text>
          )}
        </View>
      </View>
    </View>
  );
  return (
    <View className="flex flex-1 w-full bg-white">
      {/* header */}

      <View className="flex flex-row items-center justify-start  ">
        <View className="flex flex-1 flex-row items-center justify-between mx-1 my-5">
          <View className='flex-row items-center justify-start'>
          <TouchableOpacity onPress={handleChatClick}>
            <Image
              source={require('../../../assets/images/backbutton.png')}
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image
              source={require('../../../assets/images/person1.png')}
              className="w-11 h-11"
            />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <Text className="text-lg font-semibold ml-1 text-black">
              {ContactName}
            </Text>
            {/* <Text className="text-sm font-normal ml-2 text-black">online</Text> */}
          </TouchableOpacity>
          </View>

          <View className='flex-row items-center justify-end self-center content-end'>
          <TouchableOpacity onPress={handleChatClick}>
            <Image
              source={require('../../../assets/images/searchBlack.png')}
              className="w-4 h-4 mr-2"
            />
          </TouchableOpacity>
          <TouchableOpacity className='ml-2 mr-2' onPress={handleChatClick}>
            <Image
              source={require('../../../assets/images/dropDown.png')}
              className="w-1 h-4 mr-3"
            />
          </TouchableOpacity>
          </View>
          
        </View>
       
      </View>
      {/* <ImageBackground
        source={image}
        resizeMode="cover" */}
        <View
        className="w-full flex-1 flex">
        <View className="flex flex-1 bg-[#F7F7FC]">
          <FlatList
            ref={flatListRef}
            data={[...chatarray]}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
        </View>
      {/* </ImageBackground> */}
      <View className="w-full flex bg-white items-center justify-center self-center content-center mb-3">
        <View className="flex w-10/12 items-center flex-row justify-center self-center bg-white p-2 content-center">
          <TouchableOpacity
            className="p-1 "
            onPress={() => refStandard.current.open()}>
            <Image
              source={require('../../../assets/images/Icon4.png')}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <View className="flex-row  w-full items-center  bg-[#F7F7FC] border-[#FFF] border-2 my-1 rounded-lg content-center ">
            <TextInput
              className="font-normal text-black mx-2 my-1 "
              onChangeText={newText => handleMessage(newText)}
              value={userData.message}
              // value={phone_no}
              placeholder={'Type a message'}
              placeholderTextColor="#8391A1"
              autoFocus
            />
          </View>
          <View className="flex-row  p-1">
            {!button && (
              <TouchableOpacity
                className="self-center items-center justify-center"
                onPress={() => {
                  // sendPrivateValue();
                  // toggleMainContainerVisibility();
                }}>
                <Image
                  source={require('../../../assets/images/sendIcon.png')}
                  className="w-6 h-6 self-center items-center justify-center"
                />
              </TouchableOpacity>
            )}
            {button && (
              <TouchableOpacity
                className="self-center items-center justify-center"
                onPress={() => {
                  sendPrivateValue();
                  // toggleMainContainerVisibility();
                }}>
                <Image
                  source={require('../../../assets/images/sendIcon.png')}
                  className="w-8 h-8 self-center items-center justify-center"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <RBSheet ref={refStandard} dragOnContent height={300}>
            <View className="w-full flex-row justify-around mt-9">
              <TouchableOpacity
                onPress={handleChoosePhoto}
                className="items-center justify-center gap-2">
                <Image
                  source={require('../../../assets/images/photos2.png')}
                  className="w-12 h-12"
                />
                <Text className="font-normal text-black">Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center justify-center gap-2">
                <Image
                  source={require('../../../assets/images/camera.png')}
                  className="w-12 h-12"
                />
                <Text className="font-normal text-black">Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center justify-center gap-2">
                <Image
                  source={require('../../../assets/images/contact.png')}
                  className="w-12 h-12"
                />
                <Text className="font-normal text-black">Contact</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full justify-start items-start mx-10 my-8">
              <TouchableOpacity className="items-center justify-center gap-2">
                <Image
                  source={require('../../../assets/images/document.png')}
                  className="w-12 h-12"
                />
                <Text className="font-normal text-black">Document</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 28 : 0,
    // paddingVertical: 12,
    // marginVertical: 8,
    // backgroundColor:'#F9F6EE'
  },
  mainContainer: {
    paddingHorizontal: 30,
    backgroundColor: '#F0F0F0',
  },
  chatContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#F0F0F0',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailscontainer: {
    backgroundColor: '',
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    // paddingEnd: 40,
    // width: '120%',
    // alignSelf: 'flex-start',
    marginTop: 20,
  },
  flatListBadge: {
    width: 180,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    marginEnd: 10, // Adjust margin as needed
  },
  input: {
    width: '100%',
    height: 53,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
    paddingLeft: 10,
    backgroundColor: '#F0F0F0',
    color: 'black',
    fontSize: 16,
  },
  containerchat: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 12,
    maxWidth: '70%',
    backgroundColor: 'green',
    paddingHorizontal: 15,
  },
  riderContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', // Green for user messages
    // borderColor:'grey',
    elevation: 5,
    borderRadius:16

    // borderBlockColor: 'grey',
    // borderWidth:1
  },
  driverContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#002DE3', // Blue for bot messages
    elevation: 5,
    borderRadius:16,
    borderEndEndRadius:0
  },

  message: {
    color: 'black', // White text color
  },
  message1: {
    color: 'white', 



    // White text color
  },

  timeStamp: {
    color: 'black', // Adjust color as needed
    fontSize: 12,
  },
  createdAt: {
    color: 'black', // Adjust color as needed
    fontSize: 12,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalClose: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalOptions: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalOptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listIcon: {
    fontSize: 26,
    color: '#666',
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },
});

{
  /* <View className="w-full flex-wrap justify-center items-start flex self-center p-3 mt-4 flex-column  ">
<Text className="w-auto  bg-white  rounded-tr-xl rounded-b-xl p-2 text-black font-normal text-lg  my-2">
  Hi! How are you ?
</Text>

<Text className="w-full text-xs">12.35 pm</Text>
</View>
<View className="w-full  justify-center items-center flex self-center">
<View className="w-full  justify-center items-end flex self-center p-3 flex-column ">
  <Text className="w-auto  bg-[#ff590048]  rounded-tl-xl rounded-b-xl p-2 text-black font-normal text-lg  my-2">
    Hi! How are you ?
  </Text>

  <Text className="w-auto text-xs mx-4">12.35 pm</Text>
</View>
</View> */
}
