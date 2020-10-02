import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';



export const useNavigateToScreen = (screen, payload) => {

    const navigation = useNavigation();

    useCallback(() => {
        navigation.navigate(screen, payload);
    }, []);
};




