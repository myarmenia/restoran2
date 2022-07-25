import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MarkSvg = ({choosed, ...props}) => (
  <Svg
    width={14}
    height={20}
    fill={choosed ? '#F28500' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1 19.241v-18h12v18l-6-6.3-6 6.3Z"
      stroke={choosed ? '#F28500' : '#5F6368'}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);

export default MarkSvg;
