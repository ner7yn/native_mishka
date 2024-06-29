import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Song({ route }) {
    const { audioData } = route.params;
    const [sounds, setSounds] = useState([]);
    const [isPlaying, setIsPlaying] = useState({});
    const [positionMillis, setPositionMillis] = useState({});
    const [pausedPosition, setPausedPosition] = useState({});
    const intervalRef = useRef({});



    useEffect(() => {
        audioData.forEach((item, index) => {
            if (formatTime(positionMillis[index]) === item.duration && isPlaying[index]) {
                setIsPlaying(prev => ({ ...prev, [index]: false }));
                setPositionMillis(prev => ({ ...prev, [index]: 0 }));
                setPausedPosition(prev => ({ ...prev, [index]: 0 }));
            }
        });
    }, [positionMillis, isPlaying, audioData]);

    const playAudio = async (url, index) => {
        if (sounds[index]) {
            await sounds[index].unloadAsync();
        }
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: false }, status => onPlaybackStatusUpdate(status, index));
            const newSounds = [...sounds];
            newSounds[index] = sound;
            setSounds(newSounds);
            setIsPlaying(prev => ({ ...prev, [index]: true }));
            await sound.playFromPositionAsync(pausedPosition[index] || 0);
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const pauseAudio = async (index) => {
        if (sounds[index]) {
            await sounds[index].pauseAsync();
            setPausedPosition(prev => ({ ...prev, [index]: positionMillis[index] || 0 }));
            setIsPlaying(prev => ({ ...prev, [index]: false }));
        }
    };

    const onPlaybackStatusUpdate = (status, index) => {
        if (status.isPlaying) {
            setPositionMillis(prev => ({ ...prev, [index]: status.positionMillis }));
        } else if (status.didJustFinish) {
            setIsPlaying(prev => ({ ...prev, [index]: false }));
            setPositionMillis(prev => ({ ...prev, [index]: 0 }));
            setPausedPosition(prev => ({ ...prev, [index]: 0 }));
        }
    };

    useEffect(() => {
        audioData.forEach((_, index) => {
            if (isPlaying[index]) {
                intervalRef.current[index] = setInterval(() => {
                    setPositionMillis(prev => ({ ...prev, [index]: (prev[index] || 0) + 1000 }));
                }, 1000);
            } else {
                clearInterval(intervalRef.current[index]);
            }
        });

        return () => {
            audioData.forEach((_, index) => {
                clearInterval(intervalRef.current[index]);
            });
        };
    }, [isPlaying, audioData]);

    useEffect(() => {
        return () => {
            sounds.forEach(sound => {
                if (sound) {
                    sound.unloadAsync();
                }
            });
        };
    }, [sounds]);

    useEffect(() => {
        audioData.forEach((_, index) => {
            if (positionMillis[index] === 0 && isPlaying[index]) {
                setIsPlaying(prev => ({ ...prev, [index]: false }));
            }
        });
    }, [positionMillis, isPlaying, audioData]);

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
                                    {formatTime(isPlaying[index] ? positionMillis[index] || 0 : pausedPosition[index] || 0)} / {item.duration}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => isPlaying[index] ? pauseAudio(index) : playAudio(item.audioFile, index)}>
                                <AntDesign name={isPlaying[index] ? "pausecircle" : "play"} size={30} color="#777" />
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