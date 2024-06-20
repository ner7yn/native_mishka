import { Text, View, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Button as PaperButton, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function User({ navigation }) {

  return (
    <View style={{flex:1}}>
      <Appbar.Header theme={{ colors: { background: 'transparent' } }}>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          color="#5c5c5c"
        />
        <Appbar.Content
          title=" Пользовательское соглашение"
          titleStyle={{color: '#5c5c5c',
            fontFamily: 'Comfortaa_500Medium',
            fontSize: 16}}
        />
      </Appbar.Header>
      <View style={{flex:1,alignItems:'center'}}>
        <Text style={{fontFamily: "Comfortaa_400Regular",fontSize:12, width:'90%'}}>
        С помощью Словаря Lingvo вы сможете самостоятельно сделать профессиональный перевод слов и выражений с английского на русский, с русского на английский, испанский, итальянский, французский, немецкий и многие другие языки и в обратном направлении. При переводе вы не только видите значения слова в разных тематиках, формах и его транскрипцию, но также можете прослушать правильное произношение в нескольких диалектах и просмотреть всевозможные примеры и особенности употребления данного слова в текстах, устоявшиеся выражения, другие толкования, переводы пользователей сайта. Вам нужно перевести редкое или узкоспециализированное слово, либо выражение, которого нет в словаре? Вы можете попросить помощи у сообщества переводчиков на нашем сайте совершенно бесплатно. Для этого вам необходимо зарегистрироваться.
        </Text>
      </View>
    </View>
  );
}