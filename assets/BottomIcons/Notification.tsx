import * as React from "react";
import { View,Text } from "react-native";
import Svg, { Path,  } from "react-native-svg";

function NotificationIcon(props: any) {
  const { focused } = props;
  const iconColor = focused ? "#ADEE37" : "#757575"; // Change color based on focus

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
        d="M19.34 14.49l-1-1.66c-.21-.37-.40-1.07-.40-1.48V8.82a5.91 5.91 0 00-3.37-5.33A2.926 2.926 0 0011.99 2c-1.09 0-2.07.59-2.59 1.52-1.95.97-3.3 2.98-3.3 5.3v2.53c0 .41-.19 1.11-.40 1.47l-1.01 1.67c-.4.67-.49 1.41-.24 2.09.24.67.81 1.19 1.55 1.44 1.94.66 3.98.98 6.02.98 2.04 0 4.08-.32 6.02-.97.7-.23 1.24-.76 1.50-1.45s.19-1.45-.20-2.09zM14.83 20.01A3.014 3.014 0 0112 22c-.79 0-1.57-.32-2.12-.89-.32-.30-.56-.70-.70-1.11.13.02.26.03.40.05.23.03.47.06.71.08.57.05 1.15.08 1.73.08.57 0 1.14-.03 1.70-.08.21-.02.42-.03.62-.06l.49-.06z"
        fill={iconColor}
      />
    </Svg>
    <View>
    <Text style={{color:focused ? "#ADEE37" : "#757575",fontSize:12}} >Notifications</Text>

    </View>
    </View>
  );
}

export default NotificationIcon;
