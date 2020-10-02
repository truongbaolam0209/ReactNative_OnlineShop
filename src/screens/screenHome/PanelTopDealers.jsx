import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AvatarCircle from '../../components/ui/AvatarCircle';
import { Context as ProductContext } from '../../contexts/productContext';
import { colors } from '../../data/constants';



const PanelTopDealers = (props) => {

    const { allUsers } = props;
    const { state: stateProduct } = useContext(ProductContext);


    const navigation = useNavigation();
    const onGoToScreenUser = useCallback(userId => {
        navigation.navigate('ScreenUser', { userId });
    }, []);


    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => onGoToScreenUser(item.id)}
        >
            <AvatarCircle
                userImageURL={item.userImageURL}
                type='large'
            />
            <Text>{item.username}</Text>
        </TouchableOpacity>
    ), []);

    return (
        <View style={styles.container}>
            <View>
                <Text>Top dealers ...</Text>
            </View>
            <FlatList
                data={allUsers}
                renderItem={renderItem}
                keyExtractor={product => product.id}
                horizontal={true}
            />
        </View>
    );
};

export default PanelTopDealers

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        marginVertical: 15,
    },
    avatarContainer: {

        padding: 12,
    }
});
