import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

const LogoSvg = props => (
  <Svg
    width={99}
    height={99}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={49.5} cy={49.877} r={48.891} fill="#202124" />
  </Svg>
);

export default LogoSvg;
