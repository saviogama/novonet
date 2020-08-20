import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerLogin from './pages/PartnerLogin';
import PartnerHome from './pages/PartnerHome';
import UserLogin from './pages/UserLogin';
import UserHome from './pages/UserHome';
import Result from './pages/Result';

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="PartnerLogin" component={PartnerLogin} />
                <AppStack.Screen name="PartnerHome" component={PartnerHome} />
                <AppStack.Screen name="UserLogin" component={UserLogin} />
                <AppStack.Screen name="UserHome" component={UserHome} />
                <AppStack.Screen name="Result" component={Result} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
