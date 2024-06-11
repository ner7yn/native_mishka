import { Text, View, StyleSheet } from 'react-native';

export default function LoadingPage(){
    return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontFamily: 'Roboto_400Regular'}}>Loading...</Text>
    </View>
    );
}