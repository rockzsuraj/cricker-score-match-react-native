import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'

import React, { useState } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-elements'
import HomePage from './src/ui/HomePage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerIOS: {
      paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    },
    containerAndroid: {
      paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, Platform.OS === 'ios' && styles.containerIOS, Platform.OS === 'android' && styles.containerAndroid]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <StatusBar style="auto" />
          <HomePage />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default App;
