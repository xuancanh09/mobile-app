import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './loginContainer';
import RegisterScreen from '../register/RegisterScreen';
import ForgotPasswordScreen from '../forgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from '../resetPassword/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'ĐĂNG KÝ' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Quên mật khẩu' }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Đặt lại mật khẩu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
