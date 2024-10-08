import * as React from "react";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function RoutesIcon(props: any) {
  const { focused } = props;
  const iconColor = focused ? "#01B14F" : "#757575"; // Change color based on focus

  return (
    <View style={{alignContent:"center",alignItems:"center"}}>
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.47 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM16.97 15h3c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2h-3c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2z"
        stroke={iconColor}
        strokeWidth={1.5}
      />
      <Path
        d="M12 5h2.68c1.85 0 2.71 2.29 1.32 3.51L8.01 15.5C6.62 16.71 7.48 19 9.32 19H12"
        stroke={iconColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.486 5.5h.011M18.486 18.5h.011"
        stroke={iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    {/* <Text style={{color:focused ? "#01B14F" : "#757575",fontSize:12}} >Rides</Text> */}


</View>
  );
}

export default RoutesIcon;
