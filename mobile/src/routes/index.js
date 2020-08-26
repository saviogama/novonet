import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import jwt_decode from 'jwt-decode';
import AuthRoutes from './auth.routes';
import PartnerRoutes from './partner.routes';
import UserRoutes from './user.routes';
import AuthContext from '../contexts/auth';

const Routes = () => {
    const { signed, loading, user } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    else if (signed) {
        return (<PartnerRoutes />)
    }
    else if (signed) {
        return (<UserRoutes />)
    }
    else {
        return (<AuthRoutes />)
    }
}

export default Routes;