import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView,Platform,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = () => {
    const hasWhitespace = /\s/.test(newPassword);
    const isValidLength = newPassword.length >= 8;
    return { hasWhitespace, isValidLength };
  };

  const { hasWhitespace: passwordHasWhitespace, isValidLength: passwordIsValidLength } = validatePassword();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    if (newPassword === confirmPassword) {
      console.log('Password reset for email:', email);
      navigation.navigate('Login');
    } else {
      alert('Mật khẩu không khớp');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.topSection}>
        <Image 
          source={require('../../../assets/logo.png')}
          style={styles.logo} 
        />
      </View>

      <View style={styles.middleSection}>
        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? "eye-slash" : "eye"} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ErrorMessage 
            message="Có ít nhất 8 ký tự trở lên" 
            isValid={passwordIsValidLength} 
          />
          <ErrorMessage 
            message="Mật khẩu không chứa khoảng trắng" 
            isValid={!(newPassword === '' || passwordHasWhitespace)} 
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Trở về</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const ErrorMessage = ({ message, isValid = false }) => (
  <View style={styles.errorContainer}>
    <View style={[styles.errorDot, { backgroundColor: isValid ? 'green' : 'red' }]} />
    <Text style={[styles.errorText, { color: isValid ? 'green' : 'red' }]}>
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  topSection: {
    flex: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1.8,
    paddingHorizontal: 25,
  },
  bottomSection: {
    flex: 1.7,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: -100,
  },
  logo: {
    width: 500,
    height: 300,
    resizeMode: 'contain',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  eyeIcon: {
    paddingVertical: 12,
    paddingRight: 15,
    paddingLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    width: '45%',
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingLeft: 20,
  },
  errorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 2,
  },
  errorText: {
    fontSize: 12,
  },
});

export default ResetPasswordScreen;
