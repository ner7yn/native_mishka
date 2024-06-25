import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ReadySoundsScreen({ navigation }) {
    const [pressedCard, setPressedCard] = useState(null);

    const handlePressIn = (index) => {
        setPressedCard(index);
    };

    const handlePressOut = () => {
        setPressedCard(null);
    };

    const cards = [
        { text: 'Сказки', icon: <FontAwesome name="book" size={200} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('fairyTales') },
        { text: 'Песенки', icon: <FontAwesome6 name="music" size={180} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('AboutUs') },
        { text: 'Звук природы', icon: <MaterialIcons name="emoji-nature" size={200} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('Title') },
        { text: 'Звуки животных', icon: <MaterialCommunityIcons name="dog" size={200} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('Title') },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
                <View style={{ marginVertical: '3%' }}>
                    {cards.map((card, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={card.onPress}
                            onPressIn={() => handlePressIn(index)}
                            onPressOut={handlePressOut}
                            activeOpacity={1}
                            style={[styles.card, pressedCard === index && styles.cardPressed]}
                        >
                            <Text style={styles.cardText}>
                                {card.text}
                            </Text>
                            {card.icon}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#6f9c3d',
        width: width * 0.90,
        height: height * 0.22,
        marginBottom: '4%',
        borderRadius: 15,
        paddingTop: '5%',
        paddingLeft: '6%',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardPressed: {
        backgroundColor: '#608c2f',
    },
    cardText: {
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 20,
        color: "#fff",
        width: '43%'
    },
    cardIcon: {
        position: 'absolute',
        bottom: "-20%",
        right: '6%'
    }
});