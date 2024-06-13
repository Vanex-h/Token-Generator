import React, { useState } from "react";
import { RefreshControl,View, TextInput, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import tw from "twrnc";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const TokenGenerator = () => {
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleGenerateToken = async () => {
    if (!/^\d{6}$/.test(meterNumber)) {
      setError("Meter number must be exactly 6 digits.");
      return;
    }

    if (amount < 100 || amount % 100 !== 0 || amount > (365 * 5 * 100)) {
      setError(
        "Amount must be a multiple of 100 Rwf and not exceed 5 years of tokens."
      );
      return;
    }

    try {
      console.log(meterNumber, amount);
      const response = await api.post("/generate-token", {
        meterNumber,
        amount,
      });
      setToken(response.data.token);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <Text style={tw`text-2xl text-center mb-4 text-blue-500 text-3xl`}>EUCL</Text>
    
      <TextInput
        style={tw`border-2 border-gray-300 p-2 rounded-md`}
        placeholder="Meter Number"
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
        maxLength={6}
      />
      <TextInput
        style={tw`border-2 border-gray-300 p-2 rounded-md my-3`}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded mb-3`}
        onPress={handleGenerateToken}
      >
        <Text style={tw`text-white text-center`}>Generate Token</Text>
      </TouchableOpacity>
      {token && (
        <>
          <Text style={tw`text-lg`}>Token: 
             <Text style={tw`text-green-500`}> {token}
             </Text></Text>
      {/* <TouchableOpacity style={tw`border-2 border-blue-500 mt-3 rounded-full w-48 h-10 flex-coljustify-center`}>
        <Text style={tw`text-blue-500 text-center p-2`} >Get Token for new meter number &gt;</Text>
      </TouchableOpacity> */}
        </>
      )}
      {error && <Text style={tw`text-red-500`}>{error}</Text>}
          <TouchableOpacity
            style={tw`bg-blue-500 p-3 rounded mt-3`}
            onPress={() => navigation.navigate("TokenHistory", { meterNumber })}
          >
            <Text style={tw`text-white text-center`}>View Token History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-blue-500 p-3 rounded mt-3`}
            onPress={() => navigation.navigate("TokenValidator", { token })}
          >
            <Text style={tw`text-white text-center`}>View Token Validator</Text>
            
          </TouchableOpacity>
    </View>
  );
};

export default TokenGenerator;
