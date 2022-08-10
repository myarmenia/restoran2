import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackArrowSvg = props => (
  <Svg
    width={14}
    height={24}
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.57047 1.32812L0.759277 6.13932L5.57047 10.9505"
      stroke="#5F6368"
      strokeLinecap="round"
    />
  </Svg>
);

export default BackArrowSvg;
