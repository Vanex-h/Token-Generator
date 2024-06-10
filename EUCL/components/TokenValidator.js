// components/TokenValidator.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import api from '../services/api';

const TokenValidator = () => {
  const [token, setToken] = useState('');
  const [days, setDays] = useState(null);
  const [error, setError] = useState(null);

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Token"
        value={token}
        onChangeText={setToken}
        maxLength={8}
      />
      <Button title="Validate Token" onPress={handleValidateToken} />
      {days !== null && <Text>Days: {days}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
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
});

export default TokenValidator;
