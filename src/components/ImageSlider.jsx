import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;


const ImageSlider = (props) => {

    const { images } = props;
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.swiper}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => {
                    let x = e.nativeEvent.contentOffset.x;
                    let index = x / windowWidth;
                    setIndex(index);
                }}
            >
                {images.map((url, index) => (
                    <View style={styles.containerItem} key={index}>
                        <Image source={{ uri: url }} style={styles.img} />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.dots}>
                {images.map((item, _index) => (
                    <View style={styles.dot} key={_index} />
                ))}
            </View>

        </View>
    );
};

export default ImageSlider;

const styles = StyleSheet.create({
    swiper: {
        width: windowWidth,
        height: windowWidth / 375 * 324,
    },
    containerItem: {
        width: windowWidth,
        height: windowWidth / 375 * 324,
        // backgroundColor: '#ECEFF1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dots: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        height: 8,
        bottom: 12,
        justifyContent: 'space-between'
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#78909C',
        marginHorizontal: 2
    },
    img: {
        width: '100%',
        height: '100%'
    }
});
