import { useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Context as ProductContext } from '../contexts/productContext';
import PanelProductCategory from './screenCategory/PanelProductCategory';



const ScreenCategory = () => {

    const route = useRoute();
    const category = route.params.category;

    const { state: stateProduct } = useContext(ProductContext);

    const [refreshing, setRefreshing] = useState(false);
    const onRefreshScreen = () => {
        setRefreshing(true);
        fetchProducts();
        setRefreshing(false);
    };

    const renderItem = useCallback(({ item }) => (
        <PanelProductCategory product={item} />
    ), []);

    const emptyData = useCallback(() => <Text>There is no data</Text>, []);

    return (
        <View>
            <Text>{category}</Text>

            <FlatList
                data={Object.values(stateProduct).filter(item => item.category === category)}
                renderItem={renderItem}
                keyExtractor={product => product.id}
                numColumns={2}
                ListEmptyComponent={emptyData}
                refreshing={refreshing}
                onRefresh={onRefreshScreen}
            />

        </View>
    );
};

export default ScreenCategory;

const styles = StyleSheet.create({});
