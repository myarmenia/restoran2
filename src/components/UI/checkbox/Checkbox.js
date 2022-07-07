import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const MyComponent = ({text}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
        }}
      />
      <TouchableOpacity>
        <Text style={{color: '#5F6368', fontSize: 16}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
  },
});
export default MyComponent;
