import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Product } from "../components/Product.js";
import { useFetch } from "../services/useFetch.js";
export function ProductsList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data using the useFetch hook
  const { data } = useFetch();
  useEffect(() => {
    if (data) {
      setProducts(data);
      setLoading(false);
    } else {
      setError("Failed to fetch data.");
      setLoading(false);
    }
  }, [data]);

  function renderProduct({ item: product }) {
    return (
      <Product
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
        image={product.image}
        onPress={() => {
          navigation.navigate("ProductDetails", {
            productId: product.id,
          });
        }}
      />
    );
  }

  if (loading) {
    return;
    <View style={styles.container}>
      <ActivityIndicator size="large" />{" "}
    </View>;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productsList: {
    backgroundColor: "#eeeeee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
