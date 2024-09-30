import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import ChatIcon from "../../../assets/svg/ChatIcon";
import { useNavigation } from "@react-navigation/native";

export default function GetStarted() {
  const navigation: any = useNavigation();

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+94");
  const [phone_no, setphone_no] = useState("");
  const [isPressedRegister, setIsPressedRegister] = useState(false);
  const [isPressedLogin, setIsPressedLogin] = useState(true);

  const HandleRegister = () => {
    setIsPressedRegister(true);
    setIsPressedLogin(false);
    navigation.navigate("Signup");
  };
  const HandleLogin = () => {
    setIsPressedRegister(false);
    setIsPressedLogin(true);
    navigation.navigate("Login");
  };

  return (
    <View className="flex flex-1 bg-[#FFFF] flex-col h-full w-full justify-around   ">
      <View className="mt-44 items-center justify-center ">
        <ChatIcon />
      </View>
      <View className="items-start justify-start mx-8">
        <View className="w-4/6   ">
          <Text className="font-bold text-3xl text-start text-[#000]  ">
            Stay connected with your friends and family
          </Text>
        </View>
        <View className="flex-row flex items-center justify-start my-4 ">
          <Image
            source={require("../../../assets/images/secureIcon.png")}
            className="w-6 h-6"
          />
          <Text className="font-medium  text-black text-lg">
            Secure, private messaging
          </Text>
        </View>
        {/* <View className="flex flex-row  mb-12  gap-2 items-center justify-center">
          <TouchableOpacity
            className={`${
              isPressedLogin ? "bg-[#ff5b00]" : "bg-white"
            } rounded-lg`}
            onPress={HandleLogin}
          >
            <Text className="font-medium text-xl text-center mx-14 my-3 rounded-lg text-black">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${
              isPressedRegister ? "bg-[#ff5b00]" : "bg-white"
            } rounded-lg`}
            onPress={HandleRegister}
          >
            <Text className="font-medium text-xl text-center mx-12 my-3 rounded-lg text-black">
              Register
            </Text>
          </TouchableOpacity>
        </View> */}
        <View className="flex my-4 mb-8 items-center justify-center self-center w-11/12 ">
          <TouchableOpacity className="w-full" onPress={HandleLogin}> 
          <Text className="text-center font-bold text-lg text-black bg-[#ff5b00] w-full p-4 rounded-full">
            Get Started
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
