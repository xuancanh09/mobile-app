import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState(false); 
  const [isFirstClick, setIsFirstClick] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleBack = () => {
    console.log('Going back');
    navigation.goBack();
  };

  const handleVerify = () => {
    if (email) {
      if (!validateEmail(email)) {
        alert('Email không đúng định dạng. Vui lòng nhập đúng định dạng email @gmail.com');
        return;
      }
      console.log('Verifying email:', email);
      const enteredOtp = otp.join('');
      if (enteredOtp.length === 6) {
        if (enteredOtp === '123456') { // Giả sử OTP hợp lệ là '123456'
          console.log('OTP is valid');
          setOtpError(false);
          // Điều hướng đến màn hình đặt lại mật khẩu
          navigation.navigate('ResetPassword', { email: email });
        } else {
          console.log('OTP is invalid');
          setOtpError(true);
        }
      } else {
        console.log('Please enter a valid OTP');
        setOtpError(true);
      }
    } else {
      alert('Vui lòng nhập email');
    }
  };

  const sendOtpToEmail = async (email) => {
    try {
      const response = await fetch('https://your-api-endpoint.com/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('OTP sent successfully:', data);
      } else {
        console.log('Error sending OTP:', data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleResendOTP = () => {
    if (email) {
      if (!validateEmail(email)) {
        alert('Email không đúng định dạng. Vui lòng nhập đúng định dạng email @gmail.com');
        return;
      }
      console.log('Resending OTP to:', email);
      if (isFirstClick) {
        setIsFirstClick(false);
        sendOtpToEmail(email);
      } else {
        setCountdown(30);
        sendOtpToEmail(email);
      }
    } else {
      alert('Vui lòng nhập email');
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text.length === 1 && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      } else if (text.length === 0 && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/logo.png')}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity 
          style={[styles.resendButton, countdown > 0 && styles.disabledButton]}
          onPress={handleResendOTP}
          disabled={countdown > 0}
        >
          <Text style={styles.resendButtonText}>
            {countdown > 0 ? `${countdown}s` : 'Gửi lại'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, otpError && styles.otpInputError]}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (otpRefs.current[index] = ref)}
          />
        ))}
      </View>
      {otpError && (
        <View style={styles.errorContainer}>
          <View style={styles.errorDot} />
          <Text style={styles.errorText}>Mã xác thực không hợp lệ</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Trở về</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customButton} onPress={handleVerify}>
          <Text style={styles.buttonText}>Xác thực</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20, 
  },
  image: {
    width: 300, 
    height: 300, 
    marginBottom: 40, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
    marginBottom: 15, 
    position: 'relative', 
  },
  input: {
    flex: 1,
    height: 50, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25, 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  otpInputError: {
    color: 'red', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', 
    marginTop: 20,
  },
  customButton: {
    flex: 1,
    height: 45, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#007BFF', 
    borderRadius: 40, 
    marginHorizontal: 20, 
  },
  backButton: {
    flex: 1,
    height: 45, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderColor: '#A0C4FF', 
    borderWidth: 2, 
    borderRadius: 40, 
    marginHorizontal: 10, 
  },
  backButtonText: {
    color: '#000000', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18, 
  },
  resendButton: {
    position: 'absolute', 
    right: 2, 
    height: '90%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#D3D3D3',
    borderRadius: 30, 
    paddingHorizontal: 20, 
  },
  resendButtonText: {
    color: '#000000', 
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3', 
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20, 
  },
  errorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
