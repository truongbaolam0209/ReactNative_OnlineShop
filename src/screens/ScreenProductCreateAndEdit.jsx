import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as yup from 'yup';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { Context as AuthContext } from '../contexts/authContext';
import { Context as ProductContext } from '../contexts/productContext';



const FormSignupValidationSchema = yup.object().shape({
    category: yup.string().required('Name is required'),
    brand: yup.string().required('Brand is required'),
    name: yup.string().required('Name is required'),
    count: yup.number().required('Count is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required')
});


const ScreenProductCreateAndEdit = (props) => {

    const { state: stateProduct, createProduct, updateProduct } = useContext(ProductContext);

    const [loading, setLoading] = useState(false);

    const route = useRoute();
    const productEdited = route.params !== undefined && route.params.product;

    // useEffect(() => {
    //     if (error) {
    //         Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    //     }
    // }, [error]);

    const { state: stateAuth } = useContext(AuthContext);

    return (
        <View>
            <Text></Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                <Formik
                    initialValues={{
                        category: productEdited && productEdited.category || '',
                        brand: productEdited && productEdited.brand || '',
                        name: productEdited && productEdited.name || '',
                        count: productEdited && productEdited.count || '',
                        description: productEdited && productEdited.description || '',
                        price: productEdited && productEdited.price || '',

                        userId: stateAuth.user.id,
                        username: stateAuth.user.username,
                        userImageURL: stateAuth.user.userImageURL
                    }}
                    validationSchema={FormSignupValidationSchema}
                    onSubmit={(values, actions) => {
                        setLoading(true);
                        route.params !== undefined ? updateProduct({ ...values, id: productEdited.id }) : createProduct(values);
                        setLoading(false);
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View>
                            <Input
                                placeholder='category ...'
                                onChangeText={handleChange('category')}
                                onBlur={handleBlur('category')}
                                value={values.category}
                            />
                            <Text style={styles.errorText}>
                                {touched.category && errors.category}
                            </Text>

                            <Input
                                placeholder='brand ...'
                                onChangeText={handleChange('brand')}
                                onBlur={handleBlur('brand')}
                                value={values.brand}
                            />
                            <Text style={styles.errorText}>
                                {touched.brand && errors.brand}
                            </Text>

                            <Input
                                placeholder='name ...'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.errorText}>
                                {touched.name && errors.name}
                            </Text>

                            <Input
                                placeholder='count ...'
                                onChangeText={handleChange('count')}
                                onBlur={handleBlur('count')}
                                value={values.count}
                            />
                            <Text style={styles.errorText}>
                                {touched.count && errors.count}
                            </Text>

                            <Input
                                placeholder='description ...'
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            <Text style={styles.errorText}>
                                {touched.description && errors.description}
                            </Text>

                            <Input
                                placeholder='price ...'
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                                value={values.price}
                            />
                            <Text style={styles.errorText}>
                                {touched.price && errors.price}
                            </Text>




                            {loading
                                ? <Spinner size='small' />
                                : <Button onPress={handleSubmit} title='Submit' />
                            }


                        </View>
                    )}
                </Formik>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ScreenProductCreateAndEdit;


const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    }
});
