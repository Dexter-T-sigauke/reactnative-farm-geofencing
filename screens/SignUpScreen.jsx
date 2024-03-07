import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { ImageBg, logo_img } from "../assets";
import UserTextInput from "../components/UserTextInput";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

  const screenWidth = Math. round(Dimensions.get("window").width);

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          const data = {
            _id: userCred ?.user.uid,
            fullName: name,
            providerData: userCred.user.providerData[0],
          };
          setDoc(doc(firestoreDB, "users", userCred ?.user.uid), data).then(()=>{
            navigation.navigate("LoginScreen");
          }
          );
        }
      );
    }
  };
    
    
    
  return (
      <View className="flex-1 items-center justify-start">
          <Image
          source={ImageBg}
          resizeMode="cover"
          className="h-96"
          style={{ width: screenWidth }}
          />

          {/* Main View */}

          <View className="w-full h-full bg-white rounded-tl-[70px] -mt-44 flex items-center justify-start py-2 px-6 space-y-4">
              <Image source={logo_img} className="w-12 h-12 -my-0" resizeMode="contain" />


              <Text className="text-primaryText text-xl font-semibold -my-3">Join with us !</Text>
              {/* avatar section */}
              <View className="py-0 w-full flex items-center justify-center relative my-2">
                <TouchableOpacity className="w-12 h-12 p-1 rounded-full border-2 border-primary relative">
                  <Image source={{uri : "https://cdn-icons-png.freepik.com/256/149/149071.png?ga=GA1.1.274006224.1707302063&semt=ais"}} className="w-full h-full" resizeMode="contain"/>
                  <View className="w-4 h-4 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                    <MaterialIcons name="edit" size={12} color={"#fff"} />
                  </View>
                </TouchableOpacity>

              </View>
              <UserTextInput
                  placeholder="Full Name"
                  isPass={false}
                  setStatValue={setName}
              />

              <UserTextInput
                  placeholder="Email"
                  isPass={false}
                  setStatValue={setEmail}
                  setGetEmailValidationStatus = {setGetEmailValidationStatus}
              />
              <UserTextInput
                  placeholder="Password"
                  isPass={true}
                  setStatValue={setPassword}
              />

              <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex
              items-center justify-center">
                  <Text className="py-2 text-white text-xl font-semibold">
                      Create Account
                  </Text>
              </TouchableOpacity>
              <View className="w-full py-0 flex-row items-center justify-center space-x-2">
                  <Text className="text-base text-primaryText">
                    Have an account?
                  </Text>
                  <TouchableOpacity onPress={()=> navigation.navigate("LoginScreen")}>
                      <Text className="text-base font-semibold text-primaryBold">
                          Login Here
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
      );
  };
export default SignUpScreen