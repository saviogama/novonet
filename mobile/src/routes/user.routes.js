import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserHome from '../pages/UserHome';

const UserStack = createStackNavigator();

const UserRoutes = () => (
    <UserStack.Navigator screenOptions={{headerShown: false}}>
        <UserStack.Screen name="UserHome" component={UserHome} />
    </UserStack.Navigator>
)

export default UserRoutes;