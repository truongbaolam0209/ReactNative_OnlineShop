import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../data/constants';
const windowWidth = Dimensions.get('window').width;


const iconTop = [
    require('../../assets/icon/categoryIcon/Photography.png'),
    require('../../assets/icon/categoryIcon/Fashion.png'),
    require('../../assets/icon/categoryIcon/Phone.png'),
    require('../../assets/icon/categoryIcon/gift-card.png'),
    require('../../assets/icon/categoryIcon/basketball-ball.png')
];
const iconBottom = [
    require('../../assets/icon/categoryIcon/Food.png'),
    require('../../assets/icon/categoryIcon/Appliances.png'),
    require('../../assets/icon/categoryIcon/Furniture.png'),
    require('../../assets/icon/categoryIcon/car.png'),
    require('../../assets/icon/categoryIcon/toys.png')
];

const PanelCategory = () => {
    return (
        <View style={styles.cateIconContainer}>
            <View style={styles.cateIconBox}>
                {iconTop.map((cateName, index) => (
                    <TouchableOpacity key={index} style={styles.categoryIcon}>
                        <Image style={styles.category} source={cateName} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.cateIconBox}>
                {iconBottom.map((cateName, index) => (
                    <TouchableOpacity key={index} style={styles.categoryIcon}>
                        <Image style={styles.category} source={cateName} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


export default PanelCategory;

const styles = StyleSheet.create({
    cateIconContainer: {
        paddingBottom: 25
    },
    cateIconBox: {
        flexDirection: 'row',
    },
    category: {
        width: (windowWidth - 150) / 5,
        height: (windowWidth - 150) / 5,
        margin: 10
    },

    categoryIcon: {
        backgroundColor: colors.secondary,
        borderRadius: 500,
        overflow: 'hidden',
        margin: 5
    }
});
