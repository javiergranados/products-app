import React from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { loginStyles } from '../theme/loginTheme';

const LoginScreen = () => {
  return (
    <>
      <Background />
      <View style={loginStyles.container}>
        <Logo />
        <Text style={loginStyles.title}>Login</Text>
        {/* Email */}
        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,25,0.4)"
          keyboardType="email-address"
          underlineColorAndroid="white"
          style={[loginStyles.inputField, Platform.OS === 'ios' && loginStyles.inputFieldIOS]}
          selectionColor="white"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Password */}
        <Text style={loginStyles.label}>Password:</Text>
        <TextInput
          placeholder="******"
          placeholderTextColor="rgba(255,255,25,0.4)"
          underlineColorAndroid="white"
          style={[loginStyles.inputField, Platform.OS === 'ios' && loginStyles.inputFieldIOS]}
          selectionColor="white"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Login button */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {/* Register button */}
        <View style={loginStyles.registerContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={loginStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
