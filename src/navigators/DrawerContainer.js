import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { logout } from '../actions/navigation';

class DrawerContainer extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                    <Text style={styles.drawerItem}>
                        Transactions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                    <Text style={styles.drawerItem}>
                        Categories
                    </Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
                    <Text style={styles.drawerItem}>
                        Analytics
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout(navigation)}>
                    <Text style={styles.drawerItem}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default DrawerContainer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      paddingTop: 40,
      paddingHorizontal: 5
    },
    drawerItem: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0a6002',
      padding: 15,
      margin: 5,
      borderWidth: 1,
      textAlign: 'left'
    }
  })