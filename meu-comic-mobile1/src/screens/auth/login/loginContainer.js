import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (username.includes('@')) {
      if (!validateEmail(username)) {
        alert('Email không đúng định dạng. Vui lòng nhập đúng định dạng email @gmail.com');
        return;
      }
    } else {
      if (/\s/.test(username) || username.length < 8) {
        alert('Tên đăng nhập phải có ít nhất 8 ký tự và không chứa khoảng trắng');
        return;
      }
    }

    if (/\s/.test(password) || password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự và không chứa khoảng trắng');
      return;
    }
    alert('Đăng nhập thành công');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/logo.png')}
        style={styles.logo} 
      />
      <TextInput
        style={styles.input}
        placeholder="  Tên đăng nhập / Email"
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="  Mật khẩu"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Đăng nhập"
          onPress={handleLogin} 
          color="#007bff"
        />
      </View>
      <Text
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Quên mật khẩu?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 10,
    resizeMode: 'contain',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '70%',
    marginVertical: 15, 
    overflow: 'hidden',
    borderRadius: 20,
  },
  registerButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff', 
    alignItems: 'center',
    height: 40,
  },
  registerButtonText: {
    color: 'black',  
    fontSize: 15,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 5,
  },
  forgotPassword: {
    marginTop: -10, 
    marginBottom: 15,
    color: 'black',
  },
});

export default LoginScreen;
