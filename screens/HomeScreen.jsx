import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  console.log("Logged user :", user);
  return (
    
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <Text>user?.fullName</Text>
          <Text>HomeScreen</Text>
        </View>
      </SafeAreaView>
    
  )
}

export default HomeScreen