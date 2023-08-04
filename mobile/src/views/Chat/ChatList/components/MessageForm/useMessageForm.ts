import { useState } from "react";

const allUsers = [
    "user123",
    "john_doe",
    "jane_smith",
    "awesome_user",
    "test_user",
    "sample_user",
    "user456"
  ];

interface UseMessageFormResult {
  searchText: string;
  searchResults: string[];
  selectedItem: string | null;
  handleSearchChange: (text: string) => void;
  handleItemSelected: (item: string) => void;
  handleBackspace: () => void;
  handleUnselect: () => void;
  handleClose: () => void;
}

const useMessageForm = (close: () => void): UseMessageFormResult => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    if (text === "") {
      setSearchResults([]);
      setSelectedItem(null);
    } else {
      const filteredResults = allUsers.filter(user =>
        user.toLowerCase().startsWith(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const handleItemSelected = (item: string) => {
    setSelectedItem(item);
    setSearchText("");
    setSearchResults([]);
  };

  const handleBackspace = () => {
    if (searchText === "") {
      setSelectedItem(null);
      setSearchResults([]);
    }
  };

  const handleUnselect = () => {
    setSelectedItem(null);
    setSearchText("");
  };

  const handleClose = () => {
    close();
  };

  return {
    searchText,
    searchResults,
    selectedItem,
    handleSearchChange,
    handleItemSelected,
    handleBackspace,
    handleUnselect,
    handleClose,
  };
};

export default useMessageForm;
