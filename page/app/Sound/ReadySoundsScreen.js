import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ReadySoundsScreen({ navigation }) {
    const [pressedCard, setPressedCard] = useState(null);
    const [audioData, setAudioData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://node-mishka.onrender.com/audio/all')
            .then(response => response.json())
            .then(data => {
                setAudioData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handlePressIn = (index) => {
        setPressedCard(index);
    };

    const handlePressOut = () => {
        setPressedCard(null);
    };

    const getFilteredData = (category) => {
        return audioData.filter(item => item.category === category);
    };

    const cards = [
        { text: 'Сказки', icon: <FontAwesome name="book" size={200} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('fairyTales', { audioData: getFilteredData('сказка') }) },
        { text: 'Песенки', icon: <FontAwesome6 name="music" size={180} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('AboutUs', { audioData: getFilteredData('песня') }) },
        { text: 'Звук природы', icon: <MaterialIcons name="emoji-nature" size={200} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('Title', { audioData: getFilteredData('природа') }) },
        { text: 'Звуки животных', icon: <MaterialCommunityIcons name="dog" size={200} color="#a4ca79" style={styles.cardIcon} />, onPress: () => navigation.navigate('Title', { audioData: getFilteredData('животные') }) },
    ];

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
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
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
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