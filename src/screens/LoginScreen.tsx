import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/StackNavigator';
import { loginStyles } from '../theme/loginTheme';
import { AuthContext } from '../context';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> {}

const LoginScreen = ({ navigation }: Props) => {
  const { logIn, removeError, errorMessage } = useContext(AuthContext);

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    logIn({ correo: email, password });
    Keyboard.dismiss();
  };

  const navigateToRegister = () => {
    navigation.replace('RegisterScreen');
  };

  useEffect(() => {
    if (!errorMessage.length) return;
    Alert.alert('Error', errorMessage, [{ text: 'Accept', onPress: removeError }]);
  }, [errorMessage]);

  return (
    <>
      <Background />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.container}>
          {/* Logo */}
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
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={handleLogin}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Password */}
          <Text style={loginStyles.label}>Password:</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,25,0.4)"
            secureTextEntry
            underlineColorAndroid="white"
            style={[loginStyles.inputField, Platform.OS === 'ios' && loginStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={handleLogin}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Login button */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={loginStyles.button} onPress={handleLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* Register button */}
          <View style={loginStyles.registerContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={navigateToRegister}>
              <Text style={loginStyles.buttonText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
