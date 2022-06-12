import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MoreSvg = (props) => (
    <Svg
    width={5}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.97 6.782a.4.4 0 0 0 .566.565l-.565-.565Zm3.316-2.75.282.283.283-.283-.283-.283-.282.283ZM1.536.717a.4.4 0 1 0-.565.566l.565-.566Zm0 6.63 3.032-3.032-.565-.566L.97 6.782l.565.565ZM4.568 3.75 1.536.717l-.565.566 3.032 3.032.565-.566Z"
      fill="#fff"
    />
  </Svg>
)

export default MoreSvg
