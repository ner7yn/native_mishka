import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Button as PaperButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function MyRecordingScreen({ navigation }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const recording = useRef(null);
    const [isPlaying, setIsPlaying] = useState({});
    const [positionMillis, setPositionMillis] = useState({});
    const [pausedPosition, setPausedPosition] = useState({});
    const sounds = useRef([]);
    const intervalRef = useRef({});
    const [modalVisible, setModalVisible] = useState(false);
    const [newRecordingName, setNewRecordingName] = useState('');
    const [uri, setUri] = useState('');
    const [durationMillis, setDurationMillis] = useState(0);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingTimer = useRef(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [recordingToDelete, setRecordingToDelete] = useState(null);

    useEffect(() => {
        return () => {
            if (recordingTimer.current) {
                clearInterval(recordingTimer.current);
            }
            sounds.current.forEach(sound => {
                if (sound) {
                    sound.unloadAsync();
                }
            });
        };
    }, []);

    useEffect(() => {
        recordings.forEach((item, index) => {
            if (formatTime(positionMillis[index]) === formatTime(item.duration) && isPlaying[index]) {
                setIsPlaying(prev => ({ ...prev, [index]: false }));
                setPositionMillis(prev => ({ ...prev, [index]: 0 }));
                setPausedPosition(prev => ({ ...prev, [index]: 0 }));
            }
        });
    }, [positionMillis, isPlaying, recordings]);

    useEffect(() => {
        recordings.forEach((_, index) => {
            if (isPlaying[index]) {
                intervalRef.current[index] = setInterval(() => {
                    setPositionMillis(prev => ({ ...prev, [index]: (prev[index] || 0) + 1000 }));
                }, 1000);
            } else {
                clearInterval(intervalRef.current[index]);
            }
        });

        return () => {
            recordings.forEach((_, index) => {
                clearInterval(intervalRef.current[index]);
            });
        };
    }, [isPlaying, recordings]);

    useEffect(() => {
        return () => {
            sounds.current.forEach(sound => {
                if (sound) {
                    sound.unloadAsync();
                }
            });
        };
    }, [sounds]);

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            recording.current = new Audio.Recording();
            await recording.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.current.startAsync();
            setIsRecording(true);
            setIsPaused(false);
            startRecordingTimer();
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        if (!recording.current) {
            console.error('Recording is not started');
            return;
        }

        console.log('Stopping recording..');
        setIsRecording(false);
        await recording.current.stopAndUnloadAsync();
        const uri = recording.current.getURI();
        const status = await recording.current.getStatusAsync();
        const durationMillis = status.durationMillis;
        recording.current = null;
        setUri(uri);
        setDurationMillis(durationMillis);
        setModalVisible(true);
        stopRecordingTimer();
        console.log('Recording stopped and stored at', uri);
    };

    const pauseRecording = async () => {
        if (!recording.current) {
            console.error('Recording is not started');
            return;
        }

        console.log('Pausing recording..');
        await recording.current.pauseAsync();
        setIsPaused(true);
        stopRecordingTimer();
    };

    const resumeRecording = async () => {
        if (!recording.current) {
            console.error('Recording is not started');
            return;
        }

        console.log('Resuming recording..');
        await recording.current.startAsync();
        setIsPaused(false);
        startRecordingTimer();
    };

    const saveRecording = () => {
        if (newRecordingName.trim() === '') {
            alert('Please enter a recording name');
            return;
        }
        setRecordings((prev) => [...prev, { uri: uri, name: newRecordingName, duration: durationMillis }]);
        setModalVisible(false);
        setNewRecordingName('');
        setRecordingTime(0);
    };

    const playAudio = async (uri, index) => {
        if (sounds.current[index]) {
            await sounds.current[index].unloadAsync();
        }
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: uri }, { shouldPlay: false }, status => onPlaybackStatusUpdate(status, index));
            sounds.current[index] = sound;
            setIsPlaying(prev => ({ ...prev, [index]: true }));
            await sound.playFromPositionAsync(pausedPosition[index] || 0);
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const pauseAudio = async (index) => {
        if (sounds.current[index]) {
            await sounds.current[index].pauseAsync();
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

    const formatTime = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startRecordingTimer = () => {
        recordingTimer.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1000);
        }, 1000);
    };

    const stopRecordingTimer = () => {
        clearInterval(recordingTimer.current);
    };

    const confirmDeleteRecording = (index) => {
        setRecordingToDelete(index);
        setDeleteModalVisible(true);
    };

    const deleteRecording = () => {
        if (recordingToDelete !== null) {
            setRecordings((prev) => prev.filter((_, i) => i !== recordingToDelete));
            setDeleteModalVisible(false);
            setRecordingToDelete(null);
        }
    };

    const renderRightActions = (progress, dragX, index) => {
        return (
            <TouchableOpacity style={styles.backRightBtn} onPress={() => confirmDeleteRecording(index)}>
                <FontAwesome5 name="trash" size={25} color="#fff" />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.recordings}>
                {recordings.map((item, index) => (
                    <Swipeable
                        key={index}
                        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}
                    >
                        <View style={styles.card}>
                            <View style={styles.cardText}>
                                <Text style={styles.cardTextTitle}>
                                    {item.name}
                                </Text>
                                <Text style={styles.cardTime}>
                                    {formatTime(isPlaying[index] ? positionMillis[index] || 0 : pausedPosition[index] || 0)} / {formatTime(item.duration || 0)}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => isPlaying[index] ? pauseAudio(index) : playAudio(item.uri, index)}>
                                <AntDesign name={isPlaying[index] ? "pausecircle" : "play"} size={30} color="#777" />
                            </TouchableOpacity>
                        </View>
                    </Swipeable>
                ))}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            selectionColor="#6f9c3d"
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused
                            ]}
                            placeholder="Название"
                            placeholderTextColor="#a9a9a9"
                            value={newRecordingName}
                            onChangeText={setNewRecordingName}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <View style={styles.buttonContainer}>
                            <PaperButton
                                mode="outlined"
                                style={[styles.button, { backgroundColor: "#6f9c3d", borderWidth: 0, marginBottom: '2%' }]}
                                labelStyle={{ color: '#ffff', fontSize: 16, fontFamily: 'Comfortaa_400Regular' }}
                                onPress={saveRecording}>
                                Сохранить
                            </PaperButton>
                            <PaperButton
                                mode="outlined"
                                style={[styles.button, { borderWidth: 0, marginBottom: '2%' }]}
                                labelStyle={{ color: '#6f9c3d', fontSize: 16, fontFamily: 'Comfortaa_400Regular' }}
                                onPress={() => {
                                    setModalVisible(false);
                                    setRecordingTime(0); // Сброс recordingTime в 0 при нажатии кнопки "Отмена"
                                }}>
                                Отмена
                            </PaperButton>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                    setDeleteModalVisible(!deleteModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Вы уверены, что хотите удалить эту запись?</Text>
                        <View style={styles.buttonContainer}>
                            <PaperButton
                                mode="outlined"
                                style={[styles.button, { backgroundColor: "#6f9c3d", borderWidth: 0, marginBottom: '2%' }]}
                                labelStyle={{ color: '#ffff', fontSize: 18, fontFamily: 'Comfortaa_400Regular' }}
                                onPress={deleteRecording}>
                                Да
                            </PaperButton>
                            <PaperButton
                                mode="outlined"
                                style={[styles.button, { borderWidth: 0, marginBottom: '2%' }]}
                                labelStyle={{ color: '#6f9c3d', fontSize: 18, fontFamily: 'Comfortaa_400Regular' }}
                                onPress={() => setDeleteModalVisible(false)}>
                                Нет
                            </PaperButton>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.bottomBar}>
                {isRecording ? (
                    isPaused ? (
                        <TouchableOpacity onPress={resumeRecording} style={styles.buttonBar}>
                            <FontAwesome5 name="play" size={30} color="#777" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={pauseRecording} style={styles.buttonBar}>
                            <FontAwesome5 name="pause" size={30} color="#777" />
                        </TouchableOpacity>
                    )
                ) : (
                    <TouchableOpacity onPress={startRecording} style={styles.buttonBar}>
                        <FontAwesome5 name="microphone" size={30} color="#777" />
                    </TouchableOpacity>
                )}
                {isRecording && (
                    <TouchableOpacity onPress={stopRecording} style={styles.buttonBar}>
                        <FontAwesome5 name="stop-circle" size={30} color="#777" />
                    </TouchableOpacity>
                )}
                {isRecording && <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    recordings: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderColor: '#d9d9d9',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        padding: 0,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 10,
        paddingBottom: 10,
        borderWidth: 0,
        fontSize: 16,
        color: '#5c5c5c',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
        fontFamily: 'Comfortaa_400Regular',
    },
    inputFocused: {
        borderColor: '#6f9c3d',
    },
    buttonBar: {
        marginHorizontal: 10,
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderColor: '#d9d9d9',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        bottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        height: 60,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    cardText: {
        flex: 1,
    },
    cardTextTitle: {
        fontSize: 18,
        color: '#5c5c5c',
        fontFamily: 'Comfortaa_400Regular',
    },
    cardTime: {
        fontSize: 14,
        color: '#a9a9a9',
        fontFamily: 'Comfortaa_400Regular',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        color: '#5c5c5c',
        fontFamily: 'Comfortaa_400Regular',
    },
    backRightBtn: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 60,
    },
    recordingTime: {
        fontSize: 18,
        color: '#5c5c5c',
        marginLeft: 10,
        fontFamily: 'Comfortaa_400Regular',
    },
});