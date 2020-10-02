import { Feather } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as AuthContext } from '../contexts/authContext';
import { Context as CartContext } from '../contexts/cartContext';
import { Context as ProductContext } from '../contexts/productContext';
import { Context as UserContext } from '../contexts/userContext';
import { colors } from '../data/constants';
import CategoryPanel from './screenHome/PanelCategory';
import PanelProduct from './screenHome/PanelProduct';
import PanelTopDealers from './screenHome/PanelTopDealers';
import PolicyIconBar from './screenHome/PolicyIconBar';





const ScreenHome = () => {

    const { state: stateProduct, fetchProducts } = useContext(ProductContext);
    const { state: stateAuth } = useContext(AuthContext);
    const { state: stateCart, fetchCartItemsForBuyer } = useContext(CartContext);
    const { state: stateUser, fetchUsers } = useContext(UserContext);


    const [refreshing, setRefreshing] = useState(false);
    const onRefreshScreen = () => {
        setRefreshing(true);
        fetchProducts();
        setRefreshing(false);
    };

    
    const screenIsFocused = useIsFocused();
    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, [screenIsFocused]);


    useEffect(() => {
        if (stateAuth.user && stateAuth.user.role === 'buyer') {
            fetchCartItemsForBuyer(stateAuth.user.id);
        };
    }, [stateAuth]);

    const renderItem = useCallback(({ item }) => (
        <PanelProduct product={item} />
    ), []);


    const categoryName = [
        'Phone & Tablet',
        'Photography & Device',
        'Home Appliances',
        'Food & Beverages',
        'Home Furniture',
        'Fashion'
    ];

    const navigation = useNavigation();
    const onGoToScreenCategory = useCallback(category => {
        navigation.navigate('ScreenCategory', { category });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>

                <CategoryPanel />

                {categoryName.map((cateName, index) => (
                    <Fragment key={index}>
                        <View style={styles.categoryContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.text01}>{cateName}</Text>
                                <TouchableOpacity style={styles.seeMore} onPress={() => onGoToScreenCategory(cateName)}>
                                    <Text style={styles.text02}>See More</Text>
                                    <Feather name='arrow-right' size={17} color='black' />
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomWidth: 1, marginHorizontal: 5, marginVertical: 5, borderBottomColor: colors.grey }} />

                            {index % 2 === 0 && <PolicyIconBar />}

                            <FlatList
                                refreshing={refreshing}
                                onRefresh={onRefreshScreen}
                                data={Object.values(stateProduct).filter(item => item.category === cateName)}
                                renderItem={renderItem}
                                keyExtractor={product => product.id}
                                horizontal={true}
                            />

                        </View>

                        {index === 1 && <PanelTopDealers allUsers={Object.values(stateUser).filter(user => user.role === 'dealer')} />}

                    </Fragment>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ScreenHome;


const styles = StyleSheet.create({
    categoryContainer: {
        paddingBottom: 20,
        backgroundColor: 'white',
        marginVertical: 5,
        paddingTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    text01: {
        textTransform: 'uppercase',
        color: colors.secondary,
        fontFamily: 'font-medium'
    },

    text02: {
        color: colors.secondary,
        paddingRight: 5,
        fontSize: 12
    },

    seeMore: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        borderRadius: 100,
        paddingVertical: 1,
        paddingLeft: 8,
        paddingRight: 2
    }


});