import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerHome from '../pages/PartnerHome';
import CodeScanner from '../pages/CodeScanner';
import Result from '../pages/Result';

const PartnerStack = createStackNavigator();

const PartnerRoutes = () => (
    <PartnerStack.Navigator screenOptions={{headerShown: false}}>
        <PartnerStack.Screen name="PartnerHome" component={PartnerHome} />
        <PartnerStack.Screen name="CodeScanner" component={CodeScanner} />
        <PartnerStack.Screen name="Result" component={Result} />
    </PartnerStack.Navigator>
)

export default PartnerRoutes;