import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import {
  signupDatas,
} from "../../../Api Calls/Authentication";
import { useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { dispatch } from "../../../../redux/store";
import { updateProfileId, updatIsSignIn } from "../../../../redux/slices/languageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const navigation: any = useNavigation();

  const phoneNo = useSelector((state: any) => state?.language?.PhoneNo);

  const handleButtonPressCamera = async () => {
    try {
      const image: any = await ImagePicker.openCamera({
        mediaType: "photo",
        includeBase64: false,
        minWidth: 200,
        minHeight: 200,
        // height: 100,
        //  width: 100,
        quality: 0.5,
        compressImageQuality: 0.5,
      });
      console.log("imageimageimageimageimage", image);
      if (image?.didCancel) {
        console.log("User cancelled image picker");
      } else if (image.error) {
        console.log("Image picker error:", image.error);
      } else {
        let imageUri = image.path;
        console.log(imageUri, "tttttttttttttttttttttttttttt");

        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.log("Error picking tax document image:", error);
    }
  };
  const handleSignIn = () => {
    if (userName && value && dob && email && selectedImage) {
      console.log(userName,email, phoneNo, dob, value,'datasssssssssssss')

      Signupverification();
      // navigation.navigate('MainDrawer', {
      //   screen: 'Home',
      // });
      // navigation.navigate("Home");
    } else {
      setShowError(true);
    }
  };

  const Signupverification = async () => {
    // setIsOTPButtonDiable(true);
    try {
      await signupDatas(userName, email, phoneNo, dob, value,selectedImage)
        .then(async (data: any) => {
          console.log(data,'signupDatasss');

          // let result: any = await ProfileImageUpload(12, selectedImage);
          // console.log(result,'resultresult');

          if (data?.success) {
            const idToStore = data?.id;
            dispatch(updateProfileId(idToStore));

            await AsyncStorage.setItem('user_id', idToStore);
           dispatch(updatIsSignIn(true));
   
   
        //    navigation.replace("MainDrawer");
          } else {
            Alert.alert("Error", "System Error, Try again", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const handleDateConfirm = (selectedDate: any) => {
    setOpen(false);
    setDate(selectedDate);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setDob(formattedDate);
  };
  const data = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={styles.label}></Text>;
    }
    return null;
  };

  return (
    <View className="flex flex-1 w-full bg-white items-center justify-center  content-center self-center">
      <View className=" flex items-center justify-end  w-full h-1/2 bg-[#ff5b00] rounded-bl-full rounded-br-full ">
        <Text className="text-center font-semibold text-2xl text-white mb-3">
          Create an account
        </Text>
        <TouchableOpacity
          className=" items-center justify-center w-24 h-24 rounded-full bg-white mt-1 mb-1"
          onPress={handleButtonPressCamera}
        >
           {selectedImage ? (
          <Image source={{ uri: selectedImage }} className="w-24 h-24 rounded-full" />
        ) : (
          <Image
            source={require("../../../../assets/images/Cameraplus.png" )  }
            className="w-1/3 h-1/3"
          />
        )}
        </TouchableOpacity>

        <Text className="text-center font-normal text-sm text-white mt-1 mb-12">
          Sign up to continue
        </Text>
      </View>

      <View className=" flex  flex-1 my-8 w-full items-center justify-center">
        <View className="w-full items-center justify-center ">
          <TextInput
            placeholder="UserName"
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
            placeholderTextColor={"#8391A1"}
            className="w-4/5 h-12   p-3 bg-[#F7F8F9] rounded-lg text-black border-[#E8ECF4] border-[1px]"
          ></TextInput>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholderTextColor={"#8391A1"}
            className="w-4/5 h-12 mt-3 p-3 bg-[#F7F8F9] rounded-lg text-black  border-[#E8ECF4] border-[1px]"
          ></TextInput>
        </View>
        <View className="w-4/5  items-center self-center   bg-white flex-row justify-between gap-1 my-3  content-center">
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={handleDateConfirm}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableOpacity
            className=" flex w-3/5 items-center justify-center"
            onPress={() => setOpen(true)}
          >
            <TextInput
              placeholder="DOB"
              selectionColor={"#8391A1"}
              value={dob} // Display the selected date in the text field
              placeholderTextColor={"#8391A1"}
              className="w-full h-12  p-3 text-black bg-[#F7F8F9] rounded-lg border-[#E8ECF4] border-[1px] "
              editable={false} // Prevent manual input
            />
          </TouchableOpacity>

          {/* <TouchableOpacity className="w-2/5 bg-red-900 rounded-lg   h-12 justify-center items-center self-center flex-auto"> */}
          {renderLabel()}

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            itemTextStyle={styles.label}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Gender" : "Gender"}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: any) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          {/* </TouchableOpacity> */}
        </View>
        {showError && (
          <Text className="flex items-start justify-start w-4/5 mt-6 ml-4 text-red-800">
            Please fill all the fields
          </Text>
        )}
      </View>
      <View className="flex items-center justify-end mb-8  bg-[#ff5b00] w-10/12 p-3 rounded-lg">
        <TouchableOpacity
          className="w-full items-center justify-center"
          onPress={() => handleSignIn()}
        >
          <Text className="text-white">SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfCircle: {
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 200, // Adjust the value to get the desired shape
    borderBottomRightRadius: 200, // Adjust the value to get the desired shape
    backgroundColor: "#4f46e5", // Tailwind color indigo-600
  },
  gradient: {
    width: "100%",
    height: "50%",
    backgroundColor: "linear-gradient(to bottom right, #4f46e5, #3b82f6)", // Tailwind gradient from indigo-600 to blue-500
  },
  dropdown: {
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "38%",
    padding: 8,

    borderColor: "#E8ECF4",
    backgroundColor: "#F7F8F9",
    borderWidth: 2,
    borderRadius: 8,
    // paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#8391A1",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
});
