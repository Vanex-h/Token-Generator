// components/TokenHistory.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';

const TokenHistory = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchHistory = async () => {
    if(meterNumber==null || meterNumber.length<6){
      setError('Meter Number must be 6 digits');
      return;
    }
    
    try {
      console.log(meterNumber)
      const response = await api.get(`tokens/${meterNumber}`);
      setTokens(response.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Meter Number"
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
        maxLength={6}
      />
      <Button title="Fetch History" onPress={handleFetchHistory} />
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={tokens}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.tokenItem}>
            <Text>Token: {item.token}</Text>
            <Text>Days: {item.tokenValueDays}</Text>
            <Text>Amount: {item.amount} Rwf</Text>
            <Text>Status: {item.tokenStatus}</Text>
            <Text>Date: {new Date(item.purchasedDate).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
  },
  tokenItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
  },
});

export default TokenHistory;
