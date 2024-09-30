import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlusIcon(props:any) {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.5 0A16.5 16.5 0 1033 16.5 16.516 16.516 0 0016.5 0z"
        fill="#000"
      />
      <Path
        d="M16.5 0A16.5 16.5 0 1033 16.5 16.516 16.516 0 0016.5 0zm6.346 17.77H17.77v5.076a1.27 1.27 0 11-2.538 0V17.77h-5.077a1.27 1.27 0 110-2.538h5.077v-5.077a1.27 1.27 0 012.538 0v5.077h5.077a1.27 1.27 0 110 2.538z"
        fill="#ff5b00"
      />
    </Svg>
  )
}

export default PlusIcon
