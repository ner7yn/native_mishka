import { Text, View,TouchableOpacity, StyleSheet,Linking, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {

    const email = 'ner7yn@gmail.com'; // Замените на ваш email

    const handlePress = async () => {
      // Проверяем, можем ли мы открыть почтовый клиент
      const canOpen = await Linking.canOpenURL(`mailto:${email}`);
  
      if (canOpen) {
        // Открываем почтовый клиент с заранее заполненным адресом
        await Linking.openURL(`mailto:${email}`);
      } else {
        // Если не можем открыть почтовый клиент, показываем сообщение об ошибке
        Alert.alert('Не удалось открыть почтовый клиент');
      }}
    
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ marginBottom: '3%', width: '90%' }}>
                    <TouchableOpacity onPress={handlePress} style={{ height: 60, paddingHorizontal: '4%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#5c5c5c" }}>
                            Помощь
                        </Text>
                        <FontAwesome5 name="arrow-right" size={16} color="#ccc" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={{ height: 60, paddingHorizontal: '4%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#5c5c5c" }}>
                            О приложении и игрушке
                        </Text>
                        <FontAwesome5 name="arrow-right" size={16} color="#ccc" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Title')} style={{ height: 60, paddingHorizontal: '4%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#5c5c5c" }}>
                            Выйти
                        </Text>
                        <FontAwesome5 name="arrow-right" size={16} color="#ccc" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: '1%'
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