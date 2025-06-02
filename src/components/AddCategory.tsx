import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-paper-dropdown';
import {Provider as PaperProvider} from 'react-native-paper';

const OPTIONS = [
{ label: 'Male', value: 'male' },
{ label: 'Female', value: 'female' },
{ label: 'Other', value: 'other' },
];

const AddCategory = () => {
  const [value, setValue] = useState<string>();

  return (
    <PaperProvider>
      <View style={{margin: 16}}>
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          options={OPTIONS}
          value={value}
          onSelect={setValue}
        />
      </View>
    </PaperProvider>
  );
};

export default AddCategory;
