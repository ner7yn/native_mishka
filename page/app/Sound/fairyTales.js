import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function fairyTales({ route }) {
    const { audioData } = route.params;
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [positionMillis, setPositionMillis] = useState(0);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
    const [pausedPosition, setPausedPosition] = useState(0);
    const intervalRef = useRef(null);

    const playAudio = async (url, index) => {
        if (sound) {
            await sound.unloadAsync();
        }
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: false }, onPlaybackStatusUpdate);
            setSound(sound);
            setCurrentAudioIndex(index);
            await sound.playFromPositionAsync(pausedPosition);
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const pauseAudio = async () => {
        if (sound) {
            await sound.pauseAsync();
            setPausedPosition(positionMillis); // Save the current position
            setIsPlaying(false);
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isPlaying) {
            setPositionMillis(status.positionMillis);
        } else {
            setPositionMillis(status.positionMillis);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setPositionMillis(prevPosition => prevPosition + 1000);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying]);

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const formatTime = (millis) => {
        if (isNaN(millis)) {
            return '0:00';
        }
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ marginBottom: '3%', width: '100%'}}>
                    {audioData.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardText}>
                                <Text style={styles.cardTextTitle}>
                                    {item.name}
                                </Text>
                                <Text style={styles.cardTime}>
                                    {formatTime(isPlaying ? positionMillis : pausedPosition)} / {item.duration}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => isPlaying && currentAudioIndex === index ? pauseAudio() : playAudio(item.audioFile, index)}>
                                <AntDesign name={isPlaying && currentAudioIndex === index ? "pausecircle" : "play"} size={30} color="#777" />
                            </TouchableOpacity>
                        </View>
                    ))}
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
    card: {
        height: 60,
        paddingHorizontal: '4%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    cardText:{
        gap: 10
    },
    cardTextTitle:{ 
        fontFamily: 'Comfortaa_700Bold', 
        fontSize: 16, 
        color: "#5c5c5c" 
    },
    cardTime:{ 
        fontFamily: 'Comfortaa_700Bold', 
        fontSize: 12, 
        color: "#bbb" 
    }
});