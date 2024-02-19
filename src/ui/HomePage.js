import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, TextInput, Dimensions, Text, StyleSheet } from "react-native";
import RadioButton from 'react-native-elements/dist/checkbox/CheckBox';

export default function HomePage() {
    const testData = [
        ["Pakistan", 23],
        ["Pakistan", 127],
        ["India", 3],
        ["India", 71],
        ["Australia", 31],
        ["India", 22],
        ["Pakistan", 81]
    ];
    const [selectedSource, setSelectedSource] = useState("Test");
    const [data, setData] = useState(testData);
    const { width: screenWidth } = Dimensions.get('window');
    const flexDirection = screenWidth > 600 ? 'row' : 'column';
    const [country1, setCountry1] = useState('Pakistan');
    const [average1, setAverage1] = useState(null);
    const [country2, setCountry2] = useState('Pakistan');
    const [average2, setAverage2] = useState(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (selectedSource === 'Server') {
                    try {
                        const response = await fetch('https://assessments.reliscore.com/api/cric-scores/');
                        const jsonData = await response.json();
                        setData(jsonData);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                } else {
                    setData(testData);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [selectedSource]);

    const calculateAverage = (country) => {
        const scores = data.filter(([c]) => c === country);
        if (scores.length === 0) return null;
        const totalScore = scores.reduce((acc, [, score]) => acc + score, 0);
        return totalScore / scores.length;
    };

    const handleInputChange = (value, setCountry, setAverage) => {
        setCountry(value);
        const average = calculateAverage(value);
        setAverage(average);
    };

    const renderBlueBar = (average) => {
        if (average === null) {
            return null;
        }
        return <View style={{ width: screenWidth * average / 150, height: 10, backgroundColor: 'blue' }}></View>;
    };

    return (
        <View style={styles.container}>
            <RadioButton
                title="Test"
                checked={selectedSource === 'Test'}
                onPress={() => setSelectedSource("Test")}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
                containerStyle={styles.radioButton}
            />
            <RadioButton
                title="Server"
                checked={selectedSource === 'Server'}
                onPress={() => setSelectedSource("Server")}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
                containerStyle={styles.radioButton}
            />

            <View style={[styles.row, { flexDirection }]}>
                <Text style={styles.text}>The Country: {country1}</Text>
                <TextInput
                    style={styles.textInput}
                    defaultValue={country1}
                    onChangeText={(value) => handleInputChange(value, setCountry1, setAverage1)}
                />
                <Text style={styles.text}>The Average: {average1 || '-'}</Text>
                {renderBlueBar(average1)}
            </View>
            <View style={[styles.row, { flexDirection }]}>
                <Text style={styles.text}>The Country: {country2}</Text>
                <TextInput
                    style={styles.textInput}
                    defaultValue={country2}
                    onChangeText={(value) => handleInputChange(value, setCountry2, setAverage2)}
                />
                <Text style={styles.text}>The Average: {average2 || '-'}</Text>
                {renderBlueBar(average2)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    row: {
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        marginBottom: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
    },
    blueBar: {
        height: 10,
        backgroundColor: 'blue',
        marginBottom: 5,
        borderRadius: 5,
    },
    radioButton: {
        marginBottom: 10,
    }
});
