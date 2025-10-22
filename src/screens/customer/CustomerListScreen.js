import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Card,
    FAB,
    Searchbar,
    Text,
    Title,
    useTheme
} from 'react-native-paper';
import { fetchCustomers } from '../../api/services'; // Using service directly for simplicity here

const CustomerListScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const theme = useTheme();

  const loadCustomers = useCallback(async (isRefreshing = false) => {
    if (loading || (!isRefreshing && !hasMore)) return;
    setLoading(true);
    setError(null);
    const currentPage = isRefreshing ? 1 : page;

    try {
      const response = await fetchCustomers(currentPage, 10, searchQuery);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setCustomers(prev => isRefreshing ? response.data : [...prev, ...response.data]);
        if (!isRefreshing) setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to fetch customers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, loading, hasMore]);

  // UseFocusEffect to refetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      setCustomers([]);
      setPage(1);
      setHasMore(true);
      loadCustomers(true);
    }, [searchQuery])
  );

  const handleSearch = () => {
      setCustomers([]);
      setPage(1);
      setHasMore(true);
      loadCustomers(true);
  };
  
  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('CustomerDetails', { customerId: item.id })}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Text>{item.email}</Text>
      </Card.Content>
    </Card>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Searchbar
        placeholder="Search Customers"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={handleSearch}
        onSubmitEditing={handleSearch}
        style={styles.searchbar}
      />
      {error && <Text style={{ color: theme.colors.error, textAlign: 'center' }}>{error}</Text>}
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        onEndReached={() => loadCustomers()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        onRefresh={() => {
            setPage(1);
            setHasMore(true);
            loadCustomers(true);
        }}
        refreshing={loading}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddEditCustomer')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchbar: { margin: 8 },
  card: { marginHorizontal: 8, marginVertical: 4 },
  list: { paddingBottom: 80 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});

export default CustomerListScreen;