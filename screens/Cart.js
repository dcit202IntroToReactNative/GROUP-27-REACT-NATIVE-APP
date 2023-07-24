import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

import { CartContext } from "../CartContext";

export function Cart({ navigation }) {
  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {total.toFixed(2)}</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>
          {item.product.title} x {item.qty}
        </Text>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product.id.toString()}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  cartLineTotal: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    // borderTopColor: "#gray",
    // borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: "bold",
    fontSize: 28,
  },
  lineLeft: {
    fontSize: 18,
    color: "#333333",
    maxWidth: "70%",
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    // paddingHorizontal: 8,
  },
});
