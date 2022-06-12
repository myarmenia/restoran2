import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BackArrowSvg = (props) => (
  <Svg
    width={70}
    height={70}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m6.401 1.328-4.81 4.811L6.4 10.95"
      stroke="#5F6368"
      strokeLinecap="round"
    />
  </Svg>
)

export default BackArrowSvg
