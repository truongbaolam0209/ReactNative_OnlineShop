import { Formik } from 'formik';
import React, { useContext } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as yup from 'yup';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { Context as AuthContext } from '../contexts/authContext';



const FormSignupValidationSchema = yup.object().shape({

    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid Email!').required('Email is required'),
    password: yup.string().min(6, 'Too Short!').required('Password is required'),
    confirmPassword: yup.string().required('Confirm password is required').test(
        'confirm-password-test',
        'Password and confirm password should match',
        function (value) {
            return value === this.parent.password;
        }
    )
});


const ScreenSignup = (props) => {

    const { state: stateAuth, signup } = useContext(AuthContext);

    const role = 'buyer';

    return (
        <View>
            <Text></Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        role
                    }}
                    validationSchema={FormSignupValidationSchema}
                    onSubmit={(values, actions) => {
                        signup(values);
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View>
                            <Input
                                placeholder='username ...'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <Text style={styles.errorText}>
                                {touched.username && errors.username}
                            </Text>

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

                            <Input
                                placeholder='confirmPassword ...'
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={true}
                            />
                            <Text style={styles.errorText}>
                                {touched.confirmPassword && errors.confirmPassword}
                            </Text>

                            <Text>{stateAuth.errorServer}</Text>

                            {stateAuth.loading
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
export default ScreenSignup;


const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    }
});
