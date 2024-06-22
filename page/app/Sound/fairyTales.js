import { Text, View, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function fairyTales({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ marginBottom: '3%', width: '100%' }}>
                    <View style={styles.card}>
                        <View>
                            <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#5c5c5c" }}>
                                Маша и медвель
                            </Text>
                            <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#bbb" }}>
                                3:17
                            </Text>
                        </View>
                        <AntDesign name="play" size={30} color="#5c5c5c" />
                    </View>
                    <View style={styles.card}>
                        <View>
                            <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#5c5c5c" }}>
                                Сказка а рыбаке и рыбке
                            </Text>
                            <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#bbb" }}>
                                3:17
                            </Text>
                        </View>
                        <AntDesign name="play" size={30} color="#5c5c5c" />
                    </View>
                    <View style={styles.card}>
                        <View>
                            <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#5c5c5c" }}>
                                пока
                            </Text>
                            <Text style={{ fontFamily: 'Comfortaa_700Bold', fontSize: 14, color: "#bbb" }}>
                                3:17
                            </Text>
                        </View>
                        <AntDesign name="play" size={30} color="#5c5c5c" />
                    </View>
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
    }, card: {
        height: 60,
        paddingHorizontal: '4%',
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});