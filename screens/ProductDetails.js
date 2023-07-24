import React, { useContext } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useFetch } from "../services/useFetch.js"; // Import the updated useFetch hook
import { CartContext } from "../CartContext";

export function ProductDetails({ route }) {
  const { productId } = route.params;
  const { loading, error, getProduct } = useFetch(); // Fetch the data and getProduct function

  const product = getProduct(productId); // Get the product by its ID

  const { addItemToCart } = useContext(CartContext);

  function onAddToCart() {
    addItemToCart(product.id);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView>
        <Text>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Pressable style={styles.button} onPress={onAddToCart}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "orange",
    paddingVertical: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 450,
    width: "100%",
    borderRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
});
