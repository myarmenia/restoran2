import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileTabSvg = (props) => (
  <Svg
    width={17}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  > 
    <Path
      clipRule="evenodd"
      d="M8.265 20.241c-3.919 0-7.265-.61-7.265-3.052s3.325-4.697 7.265-4.697c3.919 0 7.265 2.233 7.265 4.675 0 2.441-3.325 3.074-7.265 3.074ZM8.257 10.554A4.656 4.656 0 1 0 3.6 5.898a4.64 4.64 0 0 0 4.624 4.656h.033Z"
      stroke="#5F6368"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ProfileTabSvg
