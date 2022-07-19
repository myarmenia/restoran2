import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CloseSvg = (props) => (
  <Svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m1.19 1.365 15.72 15.72M16.91 1.365 1.19 17.085"
      stroke="#5F6368"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)

export default CloseSvg
