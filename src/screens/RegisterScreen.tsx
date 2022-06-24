import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Logo } from '../components/Logo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/StackNavigator';
import { loginStyles } from '../theme/loginTheme';
import { AuthContext } from '../context';

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> {}

const RegisterScreen = ({ navigation }: Props) => {
  const { signUp, removeError, errorMessage } = useContext(AuthContext);

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = () => {
    signUp({ correo: email, password, nombre: name });
    Keyboard.dismiss();
  };

  const navigateToLogin = () => {
    navigation.replace('LoginScreen');
  };

  useEffect(() => {
    if (!errorMessage.length) return;
    Alert.alert('Error', errorMessage, [{ text: 'Accept', onPress: removeError }]);
  }, [errorMessage]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#5856D6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={loginStyles.container}>
        {/* Login button */}
        <TouchableOpacity activeOpacity={0.8} onPress={navigateToLogin} style={loginStyles.fixedButton}>
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* Logo */}
        <Logo />
        <Text style={loginStyles.title}>Register</Text>
        {/* Name */}
        <Text style={loginStyles.label}>Name:</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="rgba(255,255,25,0.4)"
          underlineColorAndroid="white"
          style={[loginStyles.inputField, Platform.OS === 'ios' && loginStyles.inputFieldIOS]}
          onChangeText={(value) => onChange(value, 'name')}
          value={name}
          onSubmitEditing={handleRegister}
          selectionColor="white"
          autoCapitalize="words"
          autoCorrect={false}
        />
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
          onSubmitEditing={handleRegister}
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
          onSubmitEditing={handleRegister}
          selectionColor="white"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Register button */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={loginStyles.button} onPress={handleRegister}>
            <Text style={loginStyles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
