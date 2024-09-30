import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function backButton(props:any) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.5}
        y={0.5}
        width={31}
        height={31}
        rx={3.5}
        fill="#fff"
        fillOpacity={0.8}
        stroke="#494B47"
      />
      <Path
        d="M17.25 11.5l-4.5 4.5 4.5 4.5"
        stroke="#494B47"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default backButton
