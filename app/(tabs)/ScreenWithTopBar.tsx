import React, { ReactNode, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../components/topBar';

type ScreenWithTopBarProps = {
  children: ReactNode;
};

function ScreenWithTopBar({ children }: ScreenWithTopBarProps) {
  const [topBarHeight, setTopBarHeight] = useState(70); 

  return (
    <View style={styles.container}>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setTopBarHeight(height);
        }}
      >
        <TopBar />
      </View>
      <View style={[styles.content, { marginTop: topBarHeight }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWithTopBar;
