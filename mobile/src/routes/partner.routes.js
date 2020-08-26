import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerHome from '../pages/PartnerHome';
import Result from '../pages/Result';

const PartnerStack = createStackNavigator();

const PartnerRoutes = () => (
    <PartnerStack.Navigator screenOptions={{headerShown: false}}>
        <PartnerStack.Screen name="PartnerHome" component={PartnerHome} />
        <PartnerStack.Screen name="Result" component={Result} />
    </PartnerStack.Navigator>
)

export default PartnerRoutes;