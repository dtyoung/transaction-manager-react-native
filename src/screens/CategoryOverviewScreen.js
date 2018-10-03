import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from '../components/common';
import { connect } from 'react-redux';
import CategoryRow from '../components/CategoryRow';
import { FloatingAction } from 'react-native-floating-action';
import { withNavigation } from 'react-navigation';

class CategoryOverviewScreen2 extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Categories',
        headerLeft: <Icon name='menu' onPress={() => navigation.toggleDrawer()} />,
        headerRight: <View />
    })

    renderCategories() {
        const { categories } = this.props;
        if(categories.length === 0) {
            return <Text>You do not have any categories. Add one using the button below!</Text>
        } else {
            const categoryCards = (
                <FlatList 
                    data={categories}
                    renderItem={({ item }) => 
                        <CategoryRow
                            key={'category' + item.key}
                            categoryName={item.name}
                            iconName={item.icon}
                            onPress={() => console.log(item.name)}
                        />
                    }    
                />
            )   
            return categoryCards;
        }
    }

    render() {
        const actions = [{
            text: 'Add Category',
            icon: <Icon name='add' color="#ffffff"/>,
            name: 'Add Category'
        }]
        return (
            <View style={{ flex: 1 }}>
                <Card>
                    {this.renderCategories()}        
                </Card>
                <FloatingAction 
                        onPressItem={() => this.props.navigation.navigate('AddCategory')}
                        overrideWithAction
                        actions={actions}
                        position='center'
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.categories
    };    
}

const CategoryOverviewScreen = connect(mapStateToProps, {})(withNavigation(CategoryOverviewScreen2));

export { CategoryOverviewScreen };

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    }
})