import { Text, View, TextInput, StyleSheet} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Button as PaperButton, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext'; // Путь к вашему AuthContext

export default function ConfirmationPage({ navigation, route }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const { email } = route.params;
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const { login } = useAuth();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Если длина value больше 1, значит это вставка
    if (value.length > 1) {
      // Оставляем только цифры
      const insertedCode = value.replace(/\D/g, '').slice(0, 6).split('');
      insertedCode.forEach((char, i) => {
        if (i < 6) {
          newCode[i] = char;
        }
      });
      setCode(newCode);

      // Устанавливаем фокус на последнюю ячейку
      const lastFilledIndex = insertedCode.length - 1;
      setFocusedIndex(lastFilledIndex);
      inputRefs.current[lastFilledIndex]?.focus();
    } else {
      // Обычный ввод одного символа
      if (/^\d*$/.test(value)) { // Проверяем, что введённый символ — цифра
        newCode[index] = value;
        setCode(newCode);

        // Переход к следующему полю, если введён символ
        if (value && index < 5) {
          setFocusedIndex(index + 1);
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0) {
      const newCode = [...code];
      if (!newCode[index]) {
        // Если текущее поле пустое, удаляем символ в предыдущем поле
        newCode[index - 1] = '';
        setCode(newCode);
        setFocusedIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Если текущее поле не пустое, просто удаляем символ в нём
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  useEffect(() => {
    setCode(['', '', '', '', '', '']);
    setFocusedIndex(0);
    inputRefs.current[0]?.focus();
  }, []);

  const isCodeComplete = code.every(digit => digit !== '');

  const getCodeString = () => code.join('');

  const verifyCode = async () => {
    const codeString = getCodeString();
    setIsLoading(true);
    try {
      const response = await fetch('https://node-mishka.onrender.com/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: codeString }),
      });

      const responseData = await response.json();

      if (response.status === 401) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Ошибка кода',
          text2: 'Код не совпадает. Пожалуйста, проверьте еще раз.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 100,
          bottomOffset: 40,
        });
      } else if (response.ok) {
        const userId = responseData.userId;
        login({ userId, email });
        navigation.navigate('AppLog');
      }
    } catch (error) {
      console.error('Ошибка при проверке кода:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
        color='#6f9c3d'
        overlayColor='rgba(255,255,255, 0.5)'
      />
      <Appbar.Header theme={{ colors: { background: 'transparent' } }}>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          color="#5c5c5c"
        />
        <Appbar.Content
          title="Введите код подтверждения"
          titleStyle={{ color: '#5c5c5c', fontFamily: 'Comfortaa_500Medium', fontSize: 18 }}
        />
      </Appbar.Header>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 35, color: "#6f9c3d", marginBottom: '1%', textAlign: 'center' }}>
            Введите код подтверждения
          </Text>
          <Text style={styles.subtitle}>
            Мы отправили письмо с кодом на почту {email} Введите этот код <Text style={{color:'#aaa'}}>(Проверьте папку Спам)</Text>
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.input, focusedIndex === index && styles.inputFocused]}
              value={digit}
              onChangeText={(value) => handleChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="numeric"
              selectionColor="#6f9c3d"
              onFocus={() => setFocusedIndex(index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
              editable={true}
              selectTextOnFocus={true}
            />
          ))}
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <PaperButton
            mode="outlined"
            style={[
              styles.button,
              { backgroundColor: "#6f9c3d", borderWidth: 0 }, !isCodeComplete && { backgroundColor: '#d3d3d3' }
            ]}
            labelStyle={[
              { color: '#ffff', fontSize: 18, fontFamily: 'Comfortaa_500Medium' },
            ]}
            onPress={verifyCode}
            disabled={!isCodeComplete}
          >
            Отправить
          </PaperButton>
        </View>
      </KeyboardAwareScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  }, subtitle: {
    fontFamily: 'Comfortaa_500Medium',
    fontSize: 14,
    color: "#5c5c5c",
    textAlign:'center'
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: '20%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '15%'
  },
  input: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: '#6f9c3d',
  },
  button: {
    marginBottom: '2%',
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
  }
});