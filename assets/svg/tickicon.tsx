import * as React from "react"
import Svg, { Path } from "react-native-svg"

function tickIcon(props:any) {
  return (
    <Svg
      width={23}
      height={10}
      viewBox="0 0 23 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.754 1.276L5.87 9.193a.733.733 0 01-1.022 0L.904 5.235a.73.73 0 01.526-1.19c.18-.01.356.05.496.164l3.432 3.455L12.733.25a.724.724 0 011.185.527.73.73 0 01-.164.498zM22 .251a.724.724 0 00-1.022 0l-7.375 7.413-1.586-1.593a.715.715 0 00-1.198.516.722.722 0 00.185.5l2.088 2.106a.733.733 0 001.022 0l7.886-7.917a.73.73 0 000-1.025z"
        fill="#000"
      />
    </Svg>
  )
}

export default tickIcon
