import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const validateUsername = () => {
    const hasWhitespace = /\s/.test(username);
    const isValidLength = username.length >= 8;
    return { hasWhitespace, isValidLength };
  };

  const validatePassword = () => {
    const hasWhitespace = /\s/.test(password);
    const isValidLength = password.length >= 8;
    return { hasWhitespace, isValidLength };
  };

  const { hasWhitespace: usernameHasWhitespace, isValidLength: usernameIsValidLength } = validateUsername();
  const { hasWhitespace: passwordHasWhitespace, isValidLength: passwordIsValidLength } = validatePassword();
  const isPasswordMatch = password === confirmPassword;

  const handleRegister = () => {
    if (usernameHasWhitespace || !usernameIsValidLength) {
      alert('Tên đăng nhập phải có ít nhất 8 ký tự và không chứa khoảng trắng');
      return;
    }
    if (passwordHasWhitespace || !passwordIsValidLength) {
      alert('Mật khẩu phải có ít nhất 8 ký tự và không chứa khoảng trắng');
      return;
    }
    if (!isPasswordMatch) {
      alert('Mật khẩu không khớp');
      return;
    }
    alert('Đăng ký thành công');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/logo.png')}
        style={styles.logo} 
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        {!usernameIsValidLength && (
          <ErrorMessage message="Có ít nhất 8 ký tự trở lên" isValid={false} />
        )}
        {(username === '' || usernameHasWhitespace) && (
          <ErrorMessage message="Tên đăng nhập không chứa khoảng trắng" isValid={false} />
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ErrorMessage 
          message="Có ít nhất 8 ký tự trở lên" 
          isValid={passwordIsValidLength} 
        />
        <ErrorMessage 
          message="Mật khẩu không chứa khoảng trắng" 
          isValid={!(password === '' || passwordHasWhitespace)} 
        />
      </View>

      <View style={[styles.inputContainer, { marginTop: 20 }]}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={!showConfirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowConfirmPassword}>
            <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {!isPasswordMatch && confirmPassword !== '' && (
          <ErrorMessage message="Xác nhận mật khẩu không chính xác" />
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 500,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    padding: 10,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    padding: 5, 
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 5, 
  },
  eyeIcon: {
    paddingLeft: 15, 
    paddingRight: 10,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
