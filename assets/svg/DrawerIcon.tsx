import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DrawerIcon(props:any) {
  return (
    <Svg
      width={16}
      viewBox="0 0 21 6"
      height={5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.125.375A2.625 2.625 0 117.5 3 2.634 2.634 0 0110.125.375zM5.25 3a2.625 2.625 0 10-2.625 2.625A2.634 2.634 0 005.25 3zM15 3A2.625 2.625 0 1017.625.375 2.634 2.634 0 0015 3z"
        fill="#000"
      />
    </Svg>
  )
}

export default DrawerIcon
