import { Text, View, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Button as PaperButton, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ConfirmationPage({ navigation, route }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const { email } = route.params;
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      setFocusedIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      setFocusedIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    setCode(['', '', '', '', '', '']);
    setFocusedIndex(0);
    inputRefs.current[0]?.focus(); // Устанавливаем фокус на первый инпут при монтировании компонента
  }, []);

  const isCodeComplete = code.every(digit => digit !== '');

  const sendCodeToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Confirm', { email });
      } else {
        alert('Ошибка при отправке email: ' + data.message);
      }
    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      alert('Произошла ошибка при отправке email. Пожалуйста, попробуйте позже.');
    }
  };

  const getCodeString = () => code.join('');

  console.log(getCodeString)

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
            Мы отправили письмо с кодом на почту {email} Введите этот код(Проверьте папку Спам)
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
              maxLength={1}
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
            onPress={() => navigation.navigate('AppLog')}
            disabled={!isCodeComplete}
          >
            Отправить
          </PaperButton>
        </View>
      </KeyboardAwareScrollView>
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
    width: 40,
    height: 40,
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