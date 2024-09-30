import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { validateVerificationOTPCode } from "../../../Api Calls/Authentication";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function OtpVerification() {
  const navigation: any = useNavigation();

  const route = useRoute();

  const phoneNumber = (route.params as any).phone_no;
  const isOldAccount = (route.params as any).isOldAccount;
  console.log(isOldAccount)
  const token = (route.params as any).token;


console.log(phoneNumber)
  let otpInput:any = useRef(null);


  console.log(otpInput)

  const [otp, setOtp] = useState("");
  console.log(otp)

  const handleOtpChange = (newOtp: any) => {
    setOtp(newOtp);
  };
  useEffect(() => {
    if (otp.length === 4) {
       console.log('done');
      confirmOTPVerificationCode();
    }
  }, [otp]);
  const confirmOTPVerificationCode = async () => {
    // setIsOTPButtonDiable(true);
    try {
      await validateVerificationOTPCode(
        phoneNumber,
        otp ,
        token
      )
        .then(async (data: any) => {
          console.log(data,'sdfsjkdjfskdljfklsd')
          // setNewRegsiteredPhoneNo(phone_no);
          if (data?.success==='true' && isOldAccount === true) {
            const idToStore = data?.id;
            console.log(idToStore, 'idToStoreidToStore')
            // await AsyncStorage.setItem('user_id', (idToStore));
         
    await AsyncStorage.setItem('user_id', idToStore);

    // Use a callback or await the Promise
  


            navigation.navigate('MainDrawer')
           
            // if (ifOldAccount) {
            //   await AsyncStorage?.setItem('access_token', value?.data?.token);
              // if (rootUser == 'Driver') {
                // setIsLoading(false);
                // dispatch(setLoggedinDriverId(value?.data?.id));
                // AsyncStorage.setItem('driverId', value?.data?.id);
                // AsyncStorage.setItem('loggedIn', 'loggedIn');
                // navigation?.navigate('AdminReviewScreen');
              // } else {
                // navigateToDashboard && navigateToDashboard(value?.data);
              // }
            // } else {
            //   if (rootUser == 'Driver') {
            //     setIsLoading(false);
            //     navigation?.navigate('DriverDetails');
            //   } else {
            //     setIsLoading(true);
            //     navigation?.navigate('SignupScreen', { phone_no: phone_no });
            //   }
            // }
          } if(data?.success==='true' && isOldAccount === false) {
            navigation.navigate('Signup')

            // setIsLoading(false);
            // setErrorBody(value?.data?.message);
            // setOtpErrorMessage(value?.data?.message);
            // setErrorHeader('Try again');
            // setModalVisible(true);
            // startShakeAnimation(emailShakeAnimationValue);
            // setIsOTPButtonDiable(true);
          }
        })
        .catch((error: any) => {
          console.log(error);
          // setModalVisible(true);
          // setErrorHeader('Server Error');
        });
    } catch (error) {
      // setphone_noError('Phone number is required');
      // setInputBorderColor('red');
      // setModalVisible(true);
      // setErrorHeader('Server Error');
      // setphone_noError('Phone number is required');
      // setInputBorderColor('red');
    }
  };

  const handleOtpReceive = async () => {
     navigation.navigate('Login')
  }
  return (
    <View className="flex flex-1 w-full items-center justify-start mx-8 my-4 self-center">
      <View className="items-center justify-center self-center w-4/5">
        <Text className="font-semibold text-lg text-[#ff5b00]">
          Verifying your number
        </Text>
        <Text className="font-normal text-sm text-center mt-6 text-black">
          Waiting to automatically detect an SMS sent +94 {phoneNumber}. Wrong
          number?
        </Text>
      </View>
     
      <View>
      <OTPTextInput
      // ref={e => (otpInput = e)}
      autoFocus={true}
      tintColor={'black'}
      
      handleTextChange={(value)=>setOtp(value)}
      defaultValue={otp}
      // containerStyle={}
      />
      </View>
      <View>
        <TouchableOpacity className="w-full"onPress={() => handleOtpReceive()}>
      <Text className="font-semibold text-sm text-center mt-12 text-[#ff5b00]">
         Didn't receive code ?
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
