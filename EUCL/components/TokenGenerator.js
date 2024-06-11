import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import api from '../services/api';

const TokenGenerator = () => {
    const [meterNumber, setMeterNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');

    const handleGenerateToken = async () => {
        try {
            console.log(meterNumber, amount)
            const response = await api.post('generate-token', { meterNumber, amount });
            setToken(response.data.token);
            setError('');
        } catch (err) {
            setError(err.response.data.message || 'Something went wrong');
        }
    };

    return (
        <View>
            <TextInput placeholder="Meter Number" value={meterNumber} onChangeText={setMeterNumber} keyboardType="numeric" maxLength={6} />
            <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <Button title="Generate Token" onPress={handleGenerateToken} />
            {token && <Text>Token: {token}</Text>}
            {error && <Text style={{color: 'red'}}>{error}</Text>}
        </View>
    );
};

export default TokenGenerator;
