import React from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../../../config/Colors";
import { style } from "./style";
import useMessageForm from "./useMessageForm";
import { User } from "@backend/database/entities/User";

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
    handleChatCreate
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
            <Text style={style.selectedUserText}>{`${selectedItem.firstName} ${selectedItem.lastName}`}</Text>
            <TouchableOpacity onPress={handleUnselect} style={style.unselectButton}>
              <AntDesign name="delete" size={25} color={Colors.beige} />
            </TouchableOpacity>
          </View>
        )}
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={({item}: {item:User}) => (
              <TouchableOpacity
                style={style.searchResultItem}
                onPress={() => handleItemSelected(item)}
              >
                <Text style={style.searchResultItemText}>{`${item.firstName} ${item.lastName}`}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          style={style.styledButton}
          onPress={handleChatCreate}
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
