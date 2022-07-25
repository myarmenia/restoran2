import * as React from "react"
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"

const AddSvg = (props) => (
  <Svg
    width={42}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={41} height={41} rx={20.5} stroke="url(#a)" />
    <Path
      d="M25.457 20.136v1.529h-8.771v-1.53h8.771ZM21.889 16.4v9.317h-1.626V16.4h1.626Z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={21}
        x2={42}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default AddSvg
