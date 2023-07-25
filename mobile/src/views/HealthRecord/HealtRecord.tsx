import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../config/Colors';
import { style } from './style';
import { StatusBar } from 'expo-status-bar';

interface DogRecord {
  id: number;
  name: string;
  breed: string;
  sex: string;
  age: number;
  deworming: HealthRecordItem[];
  externalParasite: HealthRecordItem[];
  regulationOfRutting: HealthRecordItem[];
  rabiesVaccination: HealthRecordItem[];
  vaccination: HealthRecordItem[];
}

interface HealthRecordItem {
  id: number;
  name: string;
  drugs: string;
  date: string;
}

type HealthRecordCategory = keyof DogRecord | null;

const HealthRecord: React.FC = () => {
  const [selectedDogIndex, setSelectedDogIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<HealthRecordCategory | null>(null);

  const [dogsData, setDogsData] = useState<DogRecord[]>([
    {
        id: 1,
        name: 'Dog 1',
        breed: 'Breed 1',
        sex: 'female',
        age: 2,
        deworming: [
          { id: 1, name: 'Deworming', drugs: 'Used drugs for deworming 1', date: '2023-01-01' },
          { id: 2, name: 'Deworming', drugs: 'Used drugs for deworming 2', date: '2023-01-01' },
          { id: 3, name: 'Deworming', drugs: 'Used drugs for deworming 3', date: '2023-01-01' },
        ],
        externalParasite: [
          { id: 4, name: 'External parasites', drugs: 'Used drugs for external parasites 1', date: '2023-03-01' },
        ],
        regulationOfRutting: [
          { id: 5, name: 'Regulation of rutting', drugs: 'Yes', date: '2023-03-01' },
        ],
        rabiesVaccination: [
          { id: 6, name: 'Rabies vaccination', drugs: 'Yes', date: '2023-03-01' },
        ],
        vaccination: [
          { id: 7, name: 'Vaccination', drugs: 'Vaccination used 1', date: '2023-03-01' },
        ],
      },
      {
        id: 2,
        name: 'Dog 2',
        breed: 'Breed 2',
        sex: 'male',
        age: 4,
        deworming: [
          { id: 8, name: 'Deworming', drugs: 'Used drugs for deworming 1', date: '2023-01-01' },
        ],
        externalParasite: [
          { id: 9, name: 'External parasites', drugs: 'Used drugs for external parasites 1', date: '2023-03-01' },
          { id: 10, name: 'External parasites', drugs: 'Used drugs for external parasites 2', date: '2023-03-01' },
          { id: 11, name: 'External parasites', drugs: 'Used drugs for external parasites 3', date: '2023-03-01' },
          { id: 12, name: 'External parasites', drugs: 'Used drugs for external parasites 4', date: '2023-03-01' },
          { id: 13, name: 'External parasites', drugs: 'Used drugs for external parasites 5', date: '2023-03-01' },
          { id: 14, name: 'External parasites', drugs: 'Used drugs for external parasites 6', date: '2023-03-01' },
          { id: 15, name: 'External parasites', drugs: 'Used drugs for external parasites 7', date: '2023-03-01' },
          { id: 16, name: 'External parasites', drugs: 'Used drugs for external parasites 8', date: '2023-03-01' },
        ],
        regulationOfRutting: [
          { id: 17, name: 'Regulation of rutting', drugs: 'Yes', date: '2023-03-01' },
        ],
        rabiesVaccination: [
          { id: 18, name: 'Rabies vaccination', drugs: 'Yes', date: '2023-03-01' },
        ],
        vaccination: [
          { id: 19, name: 'Vaccination', drugs: 'Vaccination used 1', date: '2023-03-01' },
        ],
      },
      {
        id: 3,
        name: 'Dog 3',
        breed: 'Breed 3',
        sex: 'male',
        age: 4,
        deworming: [
          { id: 20, name: 'Deworming', drugs: 'Used drugs for deworming 1', date: '2023-01-01' },
        ],
        externalParasite: [
          { id: 21, name: 'External parasites', drugs: 'Used drugs for external parasites 1', date: '2023-03-01' },
          { id: 22, name: 'External parasites', drugs: 'Used drugs for external parasites 2', date: '2023-03-01' },
        ],
        regulationOfRutting: [
          { id: 23, name: 'Regulation of rutting', drugs: 'Yes', date: '2023-03-01' },
        ],
        rabiesVaccination: [
          { id: 24, name: 'Rabies vaccination', drugs: 'Yes', date: '2023-03-01' },
        ],
        vaccination: [
          { id: 25, name: 'Vaccination', drugs: 'Vaccination used 1', date: '2023-03-01' },
          { id: 26, name: 'Vaccination', drugs: 'Vaccination used 2', date: '2023-03-01' },
          { id: 27, name: 'Vaccination', drugs: 'Vaccination used 3', date: '2023-03-01' },
        ],
      },
  ]);

  const handleDelete = (dogIndex: number, recordId: number) => {
    if (selectedCategory) {
      setDogsData((prevDogsData) => {
        const updatedData = prevDogsData.map((dog, index) => {
          if (index === dogIndex) {
            const updatedCategory = (dog[selectedCategory as keyof DogRecord] as HealthRecordItem[]).filter(
              (record: HealthRecordItem) => record.id !== recordId
            );
            return {
              ...dog,
              [selectedCategory]: updatedCategory,
            };
          }
          return dog;
        });
        return updatedData;
      });
    }
  };  

  const handleDogPress = (dogIndex: number) => {
    setSelectedDogIndex(dogIndex);
    setSelectedCategory(null);
  };

  const handleCategoryPress = (category: HealthRecordCategory) => {
    setSelectedCategory(category);
  };

  const handleGoBack = () => {
    setSelectedDogIndex(null);
    setSelectedCategory(null);
  };

  const renderDogItem = ({ item, index }: { item: DogRecord; index: number }) => (
    <TouchableOpacity onPress={() => handleDogPress(index)}>
      <View style={style.healthRecordContainer}>
        <Text style={style.healthRecordTitle}>{item.name}</Text>
        <View style={style.divider} />
        <View>
          <Text style={style.healthRecordText}>
            <Text>Breed:</Text> {item.breed}
          </Text>
          <Text style={style.healthRecordText}>
            <Text>Sex:</Text> {item.sex}
          </Text>
          <Text style={style.healthRecordText}>
            <Text>Age:</Text> {item.age}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSubListItem = ({ item }: { item: HealthRecordItem }) => (
    <View style={style.subListItemContainer}>
      <View style={style.subListItemContent}>
        <View style={style.subListItemTextContainer}>
          <Text style={style.subListItemTitle}>{item.name}</Text>
          <View style={style.subListItemDivider} />
          <Text style={style.subListItemText}>Drugs: {item.drugs}</Text>
          <Text style={style.subListItemText}>Date: {item.date}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => selectedDogIndex !== null && handleDelete(selectedDogIndex, item.id)}>
        <View style={style.rightIcon}>
          <Ionicons name="trash" size={30} color={Colors.beige} />
        </View>
      </TouchableOpacity>
    </View>
  );
  
  
  

  const selectedDog = selectedDogIndex !== null ? dogsData[selectedDogIndex] : null;

  if (selectedDog && selectedCategory) {
    const categoryKey = selectedCategory as keyof DogRecord;
    const categoryData = (selectedDog[selectedCategory as keyof DogRecord] as HealthRecordItem[]) || [];

    return (
      <View style={style.healthRecordViewStyle}>
        <StatusBar style="dark" />
        <FlatList
          data={categoryData}
          renderItem={renderSubListItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
        />
        <TouchableOpacity style={style.healthRecordGoBack} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  } else if (selectedDog) {
    return (
      <View style={style.healthRecordViewStyle}>
        <StatusBar style="dark" />
        <Image
          style={style.healthRecordImageCategory}
          resizeMode="cover"
          source={require('../../assets/img/background-healthRecord.png')}
        />
        <View style={style.healthRecordBlurredViewCategory}>
          <Text style={style.healthRecordTitlePage}>Dog Health Record</Text>
        </View>
        <View style={style.healthRecordListContainer}>
          <TouchableOpacity
            style={style.healthRecordCategoryContainer}
            onPress={() => handleCategoryPress('deworming')}
          >
            <Text style={style.healthRecordCategoryText}>Deworming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.healthRecordCategoryContainer}
            onPress={() => handleCategoryPress('externalParasite')}
          >
            <Text style={style.healthRecordCategoryText}>External Parasite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.healthRecordCategoryContainer}
            onPress={() => handleCategoryPress('regulationOfRutting')}
          >
            <Text style={style.healthRecordCategoryText}>Regulation of Rutting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.healthRecordCategoryContainer}
            onPress={() => handleCategoryPress('rabiesVaccination')}
          >
            <Text style={style.healthRecordCategoryText}>Rabies Vaccination</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.healthRecordCategoryContainer}
            onPress={() => handleCategoryPress('vaccination')}
          >
            <Text style={style.healthRecordCategoryText}>Vaccination</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.healthRecordGoBack} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={style.healthRecordViewStyle}>
      <StatusBar style="dark" />
      <Image
        style={style.healthRecordImage}
        resizeMode="cover"
        source={require('../../assets/img/background-healthRecord.png')}
      />
      <View style={style.healthRecordBlurredView}>
        <Text style={style.healthRecordTitlePage}>Dog Health Record</Text>
      </View>
      <FlatList
        data={dogsData}
        renderItem={renderDogItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
      />
    </View>
  );
};

export default HealthRecord;
