import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Context as AuthContext } from '../contexts/authContext';
import ScreenCart from '../screens/ScreenCart';
import ScreenCategory from '../screens/ScreenCategory';
import ScreenChat from '../screens/ScreenChat';
import ScreenHome from '../screens/ScreenHome';
import ScreenProduct from '../screens/ScreenProduct';
import ScreenProductCreateAndEdit from '../screens/ScreenProductCreateAndEdit';
import ScreenSignin from '../screens/ScreenSignin';
import ScreenSignup from '../screens/ScreenSignup';
import ScreenUser from '../screens/ScreenUser';


const Stack = createStackNavigator();

const fetchFonts = () => {
    return Font.loadAsync({
        'font-thin': require('../assets/fonts/Roboto-Thin.ttf'),
        'font-medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'font-light': require('../assets/fonts/Roboto-Light.ttf'),
    });
};

const NavigationContainerApp = (props) => {

    const { userId } = props;
    const { saveUserData } = useContext(AuthContext);

    useEffect(() => {
        if (userId) saveUserData(userId);
    }, [userId]);


    const [fontLoaded, setFontLoaded] = useState(false);
    if (!fontLoaded) {
        return (
            <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
        );
    };


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'ScreenHome'}>

                <Stack.Screen
                    name='ScreenHome'
                    component={ScreenHome}
                    options={({ route, navigation }) => ({
                        headerTransparent: false,
                        headerRight: () => <Header />
                    })}
                />

                <Stack.Screen
                    name='ScreenProduct'
                    component={ScreenProduct}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenCart'
                    component={ScreenCart}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenSignin'
                    component={ScreenSignin}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenSignup'
                    component={ScreenSignup}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenProductCreateAndEdit'
                    component={ScreenProductCreateAndEdit}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenChat'
                    component={ScreenChat}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenUser'
                    component={ScreenUser}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

                <Stack.Screen
                    name='ScreenCategory'
                    component={ScreenCategory}
                    options={{
                        headerTransparent: false,
                        headerRight: () => <Header />
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationContainerApp;

