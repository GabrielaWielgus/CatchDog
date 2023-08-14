import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../config/Colors';
import { style } from './style';
import { StatusBar } from 'expo-status-bar';
import { useWalks } from './useWalks';
import type { Walk } from '@backend/database/entities/Walk';


const Walks = () => {
  const {walks, handleDelete, deletingID} = useWalks()

  const renderWalkItem = ({ item, index }: { item: Walk; index: number }) => (
    <View style={style.walkBubble}>
      <Text style={style.walkText}>
        <Text style={style.boldText}>On Lean:</Text> {item.onLean}
      </Text>
      <Text style={style.walkText}>
        <Text style={style.boldText}>Walk Description:</Text> {item.description}
      </Text>
      <Text style={style.walkText}>
        <Text style={style.boldText}>Behavioral Disorder:</Text> {item.behavioralDisorder}
      </Text>
      {
        deletingID !== item.id ? 
      <TouchableOpacity style={style.deleteButton} onPress={() => {handleDelete(item.id)}}>
        <View style={style.rightIcon}>
          <Ionicons name="trash" size={35} color={Colors.beige} />
        </View>
      </TouchableOpacity> : null
      }
    </View>
  );

 

  return (
      <View style={style.walksViewStyle}>
        <StatusBar style="light" />
        <View>
          <Image
            resizeMode="cover"
            source={require('../../assets/img/background-walks.png')}
            style={style.walksImage}
          />
          <View style={style.blurredView}>
            <Text style={style.walkTitle}>Walks history</Text>
          </View>
        </View>

        <FlatList
          data={walks}
          renderItem={renderWalkItem}
          keyExtractor={(item, index) => index.toString()} 
          style={style.flatList}
        />
      </View>
  );
};

export default Walks;
