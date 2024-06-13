import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import tw from 'twrnc';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TokenHistory = () => {
  const route = useRoute();
  const [meterNumber, setMeterNumber] = useState(route.params?.meterNumber || '');
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (meterNumber) {
      handleFetchHistory();
    }
  }, [meterNumber]);

  const handleFetchHistory = async () => {
    if (meterNumber == null || meterNumber.length !== 6) {
      setError('Meter Number must be 6 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`tokens/${meterNumber}`);
      setTokens(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <TextInput
        style={tw`h-10 border border-gray-400 mb-3 pl-2`}
        placeholder="Meter Number"
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
        maxLength={6}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Display loading indicator
      ) : (
        <>
          {tokens.length > 0 && (
            <TouchableWithoutFeedback style={tw`bg-blue-500  rounded-md h-10 items-center flex-col justify-center w-full mb-3`}>
              <Text style={tw`text-white`}>

              Fetched History
              </Text>
            </TouchableWithoutFeedback>
          )}
          <FlatList
            data={tokens}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text style={tw`text-center`}>No history found</Text>}
            renderItem={({ item }) => (
              <View style={tw`border border-gray-400 p-2 my-2`}>
                <Text>Token: {item.token}</Text>
                <Text>Days: {item.tokenValueDays}</Text>
                <Text>Amount: {item.amount} Rwf</Text>
                <Text>Status: {item.tokenStatus}</Text>
                <Text>Date: {new Date(item.purchasedDate).toLocaleString()}</Text>
              </View>
            )}
            
          />
        </>
      )}
      {error && <Text style={tw`text-red-500`}>{error}</Text>}
    </View>
  );
};

export default TokenHistory;