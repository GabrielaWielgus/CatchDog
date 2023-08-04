import React from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../../../config/Colors";
import { style } from "./style";
import useMessageForm from "./useMessageForm";

interface Props {
  close: () => void;
}

const MessageForm = (props: Props) => {
  const {
    searchText,
    searchResults,
    selectedItem,
    handleSearchChange,
    handleItemSelected,
    handleBackspace,
    handleUnselect,
    handleClose,
  } = useMessageForm(props.close);

  return (
    <View style={style.styledContainer}>
      <View style={style.innerContainer}>
        <Text style={style.pageTitle}>Search for users</Text>
        <TextInput
          style={style.searchInput}
          placeholder="Search users..."
          value={searchText}
          onChangeText={handleSearchChange}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace();
            }
          }}
          editable={!selectedItem}
        />
        {selectedItem && (
          <View style={style.selectedUserContainer}>
            <Text style={style.selectedUserTextBold}>Selected User:</Text>
            <Text style={style.selectedUserText}>{selectedItem}</Text>
            <TouchableOpacity onPress={handleUnselect} style={style.unselectButton}>
              <AntDesign name="delete" size={25} color={Colors.beige} />
            </TouchableOpacity>
          </View>
        )}
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={style.searchResultItem}
                onPress={() => handleItemSelected(item)}
              >
                <Text style={style.searchResultItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          style={style.styledButton}
          onPress={() => {}}
        >
          <AntDesign name="message1" size={40} color={Colors.beige} />
          <Text style={style.buttonText}>Start chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttonCloseForm}
          activeOpacity={1}
          onPress={handleClose}
        >
          <AntDesign name="close" size={25} color={Colors.beige} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessageForm;
