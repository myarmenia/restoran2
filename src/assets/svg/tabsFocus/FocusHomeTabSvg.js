import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const FocusHomeTabSvg = (props) => (
  <Svg
    width={18}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.976.241a.739.739 0 0 0-.44.166L1.43 6.149A3.885 3.885 0 0 0 0 9.169v9.79c0 .7.568 1.282 1.25 1.282h5c.682 0 1.25-.583 1.25-1.282V13.83c0-.151.102-.257.25-.257h2.5c.148 0 .25.106.25.257v5.128c0 .7.568 1.282 1.25 1.282h5c.682 0 1.25-.583 1.25-1.282v-9.79a3.885 3.885 0 0 0-1.43-3.02L9.464.407A.738.738 0 0 0 8.976.24ZM9 1.991l6.643 5.367c.542.438.857 1.104.857 1.811v9.534H12V13.83c0-.982-.793-1.795-1.75-1.795h-2.5c-.957 0-1.75.813-1.75 1.795v4.872H1.5V9.168c0-.707.315-1.373.857-1.811L9 1.99Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={10.241}
        x2={18}
        y2={10.241}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#648E00" />
        <Stop offset={1} stopColor="#005100" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default FocusHomeTabSvg