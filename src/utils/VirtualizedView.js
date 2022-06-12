import React from 'react';
import {FlatList} from 'react-native';

const VirtualizedView = props => {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      showsVerticalScrollIndicator={false}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={() => <>{props.children}</>}
      scrollEnabled={props.scroll}
    />
  );
};

export default VirtualizedView;
