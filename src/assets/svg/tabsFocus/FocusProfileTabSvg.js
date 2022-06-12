import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const FocusProfileTabSvg = (props) => (
  <Svg
    width={17}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} 
  >
    <Path
      clipRule="evenodd"
      d="M8.274 20c-3.918 0-7.265-.61-7.265-3.052s3.326-4.697 7.265-4.697c3.92 0 7.266 2.233 7.266 4.675 0 2.441-3.325 3.074-7.266 3.074Z"
      stroke="url(#a)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M8.267 10.313A4.656 4.656 0 1 0 3.61 5.657a4.64 4.64 0 0 0 4.624 4.656h.033Z"
      stroke="url(#b)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.009}
        y1={16.126}
        x2={15.54}
        y2={16.126}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={3.61}
        y1={5.656}
        x2={12.923}
        y2={5.656}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default FocusProfileTabSvg
