import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { restoreToken, setLoading } from '../store/authSlice';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const { token, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, userData;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        const userJSON = await SecureStore.getItemAsync('userData');
        userData = userJSON ? JSON.parse(userJSON) : null;
      } catch (e) {
        console.error('Restoring token failed', e);
      }

      if (userToken && userData) {
        dispatch(restoreToken({ token: userToken, user: userData }));
      } else {
        dispatch(setLoading(false));
      }
    };

    bootstrapAsync();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;