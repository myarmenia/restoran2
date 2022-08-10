import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const EditSvg = props => (
  <Svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M16.473 10.905a.704.704 0 0 0-.704.704v7.037a.704.704 0 0 1-.704.704H2.393a.704.704 0 0 1-.704-.704V4.57a.704.704 0 0 1 .704-.704h8.448a.704.704 0 1 0 0-1.408H2.393A2.112 2.112 0 0 0 .28 4.57v14.076a2.112 2.112 0 0 0 2.112 2.112h12.672a2.112 2.112 0 0 0 2.112-2.112V11.61a.704.704 0 0 0-.704-.704Z"
      fill="#3C4043"
      stroke="#0E1013"
      strokeWidth={0.2}
      strokeMiterlimit={10}
    />
    <Path
      d="M19.203 1.84a2.695 2.695 0 0 0-3.81 0L6.119 11.11a.719.719 0 0 0-.17.276L4.544 15.61a.703.703 0 0 0 .89.889l4.223-1.408a.703.703 0 0 0 .275-.173l9.273-9.273a2.695 2.695 0 0 0 0-3.806Z"
      fill="#3C4043"
      stroke="#0E1013"
      strokeWidth={0.2}
      strokeMiterlimit={10}
    />
  </Svg>
);

export default EditSvg;
