import { Text, View, StyleSheet } from 'react-native';

export default function TitlePage(){
    return (
        <View style={styles.container}>
        <Text style={{ fontFamily:'Roboto_500Medium',fontSize:30}}>
          Лучший друг
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });