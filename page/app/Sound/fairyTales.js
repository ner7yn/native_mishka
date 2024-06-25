import { Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function fairyTales({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ marginBottom: '3%', width: '100%'}}>
                    <View style={styles.card}>
                        <View style={styles.cardText}>
                            <Text style={styles.cardTextTitle}>
                                Маша и медвель
                            </Text>
                            <Text style={styles.cardTime}>
                                3:17
                            </Text>
                        </View>
                        <AntDesign name="play" size={30} color="#777" />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardText}>
                            <Text style={styles.cardTextTitle}>
                                Сказка а рыбаке и рыбке
                            </Text>
                            <Text style={styles.cardTime}>
                                3:17
                            </Text>
                        </View>
                        <AntDesign name="play" size={30} color="#777" />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardText}>
                            <Text style={styles.cardTextTitle}>
                                пока
                            </Text>
                            <Text style={styles.cardTime}>
                                3:17
                            </Text>
                        </View>
                        <AntDesign name="play" size={30} color="#777" />
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
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },cardText:{
        gap:10
    },cardTextTitle:{ 
        fontFamily: 'Comfortaa_700Bold', 
        fontSize: 16, 
        color: "#5c5c5c" 
    },cardTime:{ 
        fontFamily: 'Comfortaa_700Bold', 
        fontSize: 12, 
        color: "#bbb" 
    }
});