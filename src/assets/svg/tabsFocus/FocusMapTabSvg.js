import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const FocusMapTabSvg = (props) => (
  <Svg
    width={17}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} 
  >
    <Path
      d="M8.5 1C4.365 1 1 4.364 1 8.5c0 4.004 6.837 12.273 7.128 12.623a.483.483 0 0 0 .744 0C9.162 20.773 16 12.503 16 8.5 16 4.364 12.636 1 8.5 1Zm0 19.047a67.758 67.758 0 0 1-3.112-4.214C3.15 12.523 1.967 9.987 1.967 8.5A6.54 6.54 0 0 1 8.5 1.967 6.54 6.54 0 0 1 15.034 8.5c0 1.487-1.184 4.022-3.422 7.333A67.803 67.803 0 0 1 8.5 20.047Z"
      fill="url(#a)"
      stroke="url(#b)"
      strokeWidth={0.5}
    />
    <Path
      d="M8.5 5.41C6.57 5.41 5 6.98 5 8.91s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5Zm0 6.146a2.65 2.65 0 0 1-2.646-2.647A2.65 2.65 0 0 1 8.5 6.263a2.65 2.65 0 0 1 2.646 2.646A2.65 2.65 0 0 1 8.5 11.556Z"
      fill="url(#c)"
      stroke="url(#d)"
      strokeWidth={0.5}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1}
        y1={11.148}
        x2={16}
        y2={11.148}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={1}
        y1={11.148}
        x2={16}
        y2={11.148}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={5}
        y1={8.909}
        x2={12}
        y2={8.909}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={5}
        y1={8.909}
        x2={12}
        y2={8.909}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default FocusMapTabSvg
