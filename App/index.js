// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Button, View, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide a list of workouts." },
                    { role: "user", content: `Give me a list of workouts` }
                ],
                model: "gpt-4o"
            });
            const workoutsResponse = JSON.parse(response.data.response);
            setWorkouts(workoutsResponse.workouts);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderWorkout = ({ item }) => (
        <View style={styles.workoutItem}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Start Workout" onPress={() => {}} />
        </View>
    );

    return (
        <FlatList
            data={workouts}
            renderItem={renderWorkout}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
        />
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <WorkoutList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        flexGrow: 1,
    },
    workoutItem: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});