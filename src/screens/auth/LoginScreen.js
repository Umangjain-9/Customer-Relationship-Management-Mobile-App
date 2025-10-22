import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../store/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => dispatch(login(values))}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && <Text style={{ color: theme.colors.error }}>{errors.email}</Text>}
            
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={styles.input}
              secureTextEntry
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && <Text style={{ color: theme.colors.error }}>{errors.password}</Text>}
            
            {error && <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10, paddingVertical: 5 },
  error: { textAlign: 'center', marginTop: 10 },
});

export default LoginScreen;