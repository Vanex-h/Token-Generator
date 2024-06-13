import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import tw from 'twrnc';

const TokenValidator = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [token, setToken] = useState(route.params?.token || '');
  const [days, setDays] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      handleValidateToken();
    }
  }, [token]);

  const handleValidateToken = async () => {
    try {
      const response = await api.post('/validate-token', { token });
      setDays(response.data.days);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <TextInput
        style={tw`h-10 border border-gray-400 mb-3 pl-2`}
        placeholder="Token"
        value={token}
        onChangeText={setToken}
        maxLength={8}
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded mb-3`}
        onPress={handleValidateToken}
      >
        <Text style={tw`text-white text-center`}>Validate Token</Text>
      </TouchableOpacity>
      {days !== null && <Text>Days: {days}</Text>}
      {error && <Text style={tw`text-red-500`}>{error}</Text>}
    </View>
  );
};

export default TokenValidator;