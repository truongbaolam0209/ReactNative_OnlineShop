import { Formik } from 'formik';
import React, { useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as yup from 'yup';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { Context as AuthContext } from '../contexts/authContext';


const FormLoginValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email!').required('Required'),
    password: yup.string().min(6, 'Too Short!').required('Required'),
});


const ScreenSignin = (props) => {

    const { state: stateAuth, signin } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={FormLoginValidationSchema}
                    onSubmit={(values, actions) => {
                        signin(values);
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View>
                            <Input
                                placeholder='email ...'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Text style={styles.errorText}>
                                {touched.email && errors.email}
                            </Text>

                            <Input
                                placeholder='password ...'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                            />
                            <Text style={styles.errorText}>
                                {touched.password && errors.password}
                            </Text>

                            <Text>{stateAuth.errMessage}</Text>

                            {stateAuth.loading
                                ? <Spinner size='small' />
                                : <Button onPress={handleSubmit} title='Submit' />
                            }

                        </View>
                    )}
                </Formik>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
export default ScreenSignin;


const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    }
});
