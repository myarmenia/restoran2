import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SearchBtn = (props) => (
  <Svg
    width={22}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m21.731 20.676-6.256-6.256a8.666 8.666 0 0 0 1.941-5.47C17.416 4.147 13.51.24 8.708.24 3.907.241 0 4.148 0 8.949c0 4.802 3.907 8.708 8.708 8.708 2.072 0 3.974-.73 5.47-1.941l6.257 6.256a.914.914 0 0 0 1.296 0 .916.916 0 0 0 0-1.296ZM8.708 15.824A6.882 6.882 0 0 1 1.833 8.95a6.882 6.882 0 0 1 6.875-6.875 6.882 6.882 0 0 1 6.875 6.875 6.882 6.882 0 0 1-6.875 6.875Z"
      fill="#5F6368"
    />
  </Svg>
)

export default SearchBtn
