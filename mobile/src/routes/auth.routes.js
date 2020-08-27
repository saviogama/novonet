import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerLogin from '../pages/PartnerLogin';
import UserLogin from '../pages/UserLogin';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="PartnerLogin" component={PartnerLogin} />
        <AuthStack.Screen name="UserLogin" component={UserLogin} />
    </AuthStack.Navigator>
)

export default AuthRoutes;