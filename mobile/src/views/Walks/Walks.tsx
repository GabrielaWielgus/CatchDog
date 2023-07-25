import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../config/Colors';
import { style } from './style';
import { StatusBar } from 'expo-status-bar';

interface WalkData {
  onLean: string;
  walkDescription: string;
  behavioralDisorder: string;
}

const Walks = () => {
  const [walksData, setWalksData] = useState<WalkData[]>([
    {
        onLean: 'yes',
        walkDescription: 'Walk description 1',
        behavioralDisorder: 'none',
    },
    {
        onLean: 'yes',
        walkDescription: 'Walk description 2',
        behavioralDisorder: 'none',
    },
    {
        onLean: 'yes',
        walkDescription: 'Walk description 3',
        behavioralDisorder: 'none',
    },
    {
        onLean: 'yes',
        walkDescription: 'Walk description 4',
        behavioralDisorder: 'none',
    },
    {
        onLean: 'yes',
        walkDescription: 'Walk description 5',
        behavioralDisorder: 'none',
    },
  ]);

  const renderWalkItem = ({ item, index }: { item: WalkData; index: number }) => (
    <View style={style.walkBubble}>
      <Text style={style.walkText}>
        <Text style={style.boldText}>On Lean:</Text> {item.onLean}
      </Text>
      <Text style={style.walkText}>
        <Text style={style.boldText}>Walk Description:</Text> {item.walkDescription}
      </Text>
      <Text style={style.walkText}>
        <Text style={style.boldText}>Behavioral Disorder:</Text> {item.behavioralDisorder}
      </Text>
      <TouchableOpacity style={style.deleteButton} onPress={() => handleDeleteWalk(index)}>
        <View style={style.rightIcon}>
          <Ionicons name="trash" size={20} color={Colors.beige} />
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleDeleteWalk = (index: number) => {
    const updatedWalksData = walksData.filter((_, i) => i !== index);
    setWalksData(updatedWalksData);
  };

  return (
    <>
      <View style={style.walksViewStyle}>
        <StatusBar style="dark" />
        <View>
          <Image
            resizeMode="cover"
            source={require('../../assets/img/background-walks.png')}
            style={style.walksImage}
          />
          <Text style={style.walkTitle}>Your Walks History</Text>
        </View>

        <FlatList
          data={walksData}
          renderItem={renderWalkItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
        />
      </View>
    </>
  );
};

export default Walks;
