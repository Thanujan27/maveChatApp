import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
// import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { CountryPicker } from "react-native-country-codes-picker";
import { fontSize } from "nativewind/dist/tailwind/native/font-size";
import ChatIcon from "../../../../assets/svg/ChatIcon";
import { getOTPVerificationCode } from "../../../Api Calls/Authentication";
import { setPhoneNo } from "../../../../redux/slices/languageSlice";
import { dispatch } from "../../../../redux/store";

export default function Login() {

  const navigation: any = useNavigation();

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+94");
  const [phone_no, setphone_no] = useState("");
  const [isPressedRegister, setIsPressedRegister] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  const [isPressedLogin, setIsPressedLogin] = useState(true);
  const [phone_noError, setphone_noError] = useState("");

  

  const handleSignIn = async () => {
    setButtonActive(true)
    await validatePhoneNumber();
    
    try {
      if(!phone_noError){
        dispatch(setPhoneNo(phone_no));
        console.log(phone_no,'phone_nophone_no')
  
        // navigation.navigate('OtpVerification')
        await getOTPVerificationCode(
          phone_no
        ).then((data: any) => {
          console.log('valuedadasddasd', data);
          const isOldAccount = data?.isOldAccount;
          console.log('value.data.token) ', isOldAccount);
          if (data.token) {
            navigation.navigate('OtpVerification', {
              phone_no: phone_no,
              isOldAccount: isOldAccount,
              token: data?.token
            });
  
          } else {
            if (data?.message == 'otp generation failed') {
              // setShowError(true);
            }
            if (data?.message !== 'otp generation failed') {
              // setModalVisible(true);
              // setErrorHeader(value?.data?.header ?? 'Server Error');
              // setErrorHeaderBody(value?.data?.message);
            }
  
            //  setIsDisabled(false);
  
            // setIsDisabled(false);
          }
        });
      }
    
    }

    catch (error:any) {
      // Handle errors
      console.error('Error:', error);

      // Show an alert with the error message
      Alert.alert(
        'ErrorApp',
        error.message || 'An unexpected error occurred.',
        [
          {
            text: 'OK',
            onPress: () => console.log('Alert dismissed'),
          },
        ]
      );
    }
  };

  const validatePhoneNumber = async () => {
    if (phone_no.trim() === "") {
      setphone_noError("Phone number is required");
      return;
    } else if (phone_no.length < 9) {
      setphone_noError("Phone number is too short");
      return;
    } else if (phone_no.length > 9) {
      setphone_noError("Phone number is too long");
      return;
    } else {
      setphone_noError("");
    }
  };

  return (
    //     <View className="flex bg-yellow-50 flex-col h-screen  w-full justify-center items-center">
    //       <View className="flex flex-row w-full bg-white-300 justify-center items-center">
    //         <View className="w-[15%] ">
    //           <TouchableOpacity
    //             className={""}
    //             onPress={() => setShow(true)}
    //             style={{
    //               alignItems: "center",
    //               justifyContent: "center",
    //             //   width: "100%",
    //               height: 50,
    //               backgroundColor: "white",
    //               // backgroundColor: 'red',
    //              borderRadius: 6,
    //               borderWidth: 1,
    //               // padding: 10,

    //               borderColor: "#E8ECF4",
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 // color: '#8391A1',
    //                 color: "black",
    //                 fontSize: 13,
    //               }}
    //             >
    //               {countryCode}
    //             </Text>
    //           </TouchableOpacity>
    //           <CountryPicker
    //             show={show}
    //             lang={"en"}
    //             style={{
    //               modal: {
    //                 height: 300,
    //                 backgroundColor: "white",
    //               },

    //               backdrop: {},
    //               line: {
    //                 borderColor: "#E8ECF4",
    //                 borderWidth: 1,
    //               },
    //               itemsList: {},
    //               textInput: {
    //                 height: 60,
    //                 borderRadius: 0,
    //                 color: "black",
    //               },
    //               countryButtonStyles: {
    //                 height: 50,
    //                 borderColor: "#E8ECF4",
    //                 borderRadius: 6,
    //                 borderWidth: 1,
    //               },
    //               searchMessageText: {
    //                 color: "red",
    //               },
    //               countryMessageContainer: {},

    //               flag: {
    //                 alignItems: "center",
    //                 alignContent: "center",
    //                 justifyContent: "center",
    //                 fontSize: 27,
    //               },

    //               dialCode: {
    //                 color: "black",
    //               },

    //               countryName: {
    //                 color: "black",
    //               },
    //             }}
    //             searchMessage={"Sorry we cant find your country :("}
    //             pickerButtonOnPress={(item: any) => {
    //               setCountryCode(item.dial_code);
    //               setShow(false);
    //             }}
    //           />
    //           {/* <Text style={styles.countryCodeText}>+94</Text> */}
    //         </View>

    //         <View className={"w-[80%] h-12 rounded-md"} style={{ backgroundColor: "white" }}>
    //           <TextInput
    //             // style={styles.input1}
    //             onChangeText={(text) => {
    //               const numericText = text.replace(/[^0-9]/g, "");
    //               setphone_no(numericText);
    //               // setIsDisabled(false);

    //               // setInputBorderColor('#8391A1'); // Reset input border color on change
    //             }}
    //             value={phone_no}
    //             placeholder={"Enter Phone Number"}
    //             placeholderTextColor="#8391A1"
    //             keyboardType="numeric"
    //             // autoFocus
    //           />
    //           {/*<SpinnerOverlay visible={isLoading} size={30} />*/}
    //         </View>
    // <View>
    // {/* <Button
    //         title="Press me"
    //         color="#f194ff"
    //         onPress={() => Alert.alert('Button with adjusted color pressed')}
    //       /> */}
    //       </View>
    //       </View>
    //     </View>
    <View className=" flex flex-1  items-center  mx-8 my-4">
      <View className="gap-3 w-full items-center">
        <Text className="text-lg text-[#ff5b00] font-semibold text-center">
          Enter your phone number
        </Text>
        <Text className="text-xs text-black font-normal text-center ">
          Mave will need to verify your phone number. Carrier charges may apply.
        </Text>
      </View>
      <View className="flex flex-1 items-center justify-start w-4/5 ">
        <TouchableOpacity className="flex  items-center justify-center border-b-2  border-black w-full mt-6">
          <Text className="text-lg text-black font-normal text-center mb-1">
            Sri Lanka
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-between w-full mt-3  ">
          <Text className=" flex border-b-2 w-3/12 text-base text-black border-black text-start mt-2 p-2">
            + 94
          </Text>
          <TextInput
            className="border-b-2 w-8/12 text-sm text-black border-[#000] "
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, "");
              setphone_no(numericText);
              setphone_noError('')
              setButtonActive(false)

              // setIsDisabled(false);

              // setInputBorderColor('#8391A1'); // Reset input border color on change
            }}
            value={phone_no}
            placeholder={"Enter Phone Number"}
            placeholderTextColor="#8391A1"
            keyboardType="numeric"
            autoFocus
          />
        </View>
        {phone_noError !== "" && (
          <Text className="p-2 mt-2 text-start font-normal text-red-700 w-full">
            {phone_noError}
          </Text>
        )}
      </View>
      <View className="flex justify-end  items-center w-full flex-1 ">
        <TouchableOpacity className="w-full"
        disabled={buttonActive} onPress={() => handleSignIn()}>
          <Text  style={[
       
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: buttonActive ? '#a4a9b5' : '#ff5b00',
        },
       
      ]}
     className="font-semibold text-white bg-[#ff5b00] w-full rounded-lg text-center p-3">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
