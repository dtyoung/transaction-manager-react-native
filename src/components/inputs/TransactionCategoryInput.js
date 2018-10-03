import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { categoryChanged } from '../../actions/addTransaction';
import CategoryRow from '../CategoryRow';

class TransactionCategoryInput2 extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,

        }
    }

    getCategoryText() {
        
        if(this.props.selectedCategoryId) {
            const category = this.props.categories.find((element) => {
                return element.key === this.props.selectedCategoryId
            });
            return category.name;
        } else {
            return 'Select a Category';
        }
        
    }

    getCategoryIcon() {
        if(this.props.selectedCategoryId) {
            const category = this.props.categories.find((element) => {
                return element.key === this.props.selectedCategoryId
            })
            return (
                <Icon
                    reverse
                    reverseColor='black'
                    color='#dddddd'
                    name={category.icon}
                    containerStyle={styles.iconStyle}
                    size={30}
                />
            )
        } else {
            return (
                <Icon
                    reverse
                    reverseColor='black'
                    color='#dddddd'
                    type='font-awesome'
                    name='question'
                    containerStyle={styles.iconStyle}
                    size={30}
                />
            )
        }
    }

    render() {
        const { containerStyle, textStyle, touchableStyle } = styles;
        return (
            <View style={containerStyle}>
                {this.getCategoryIcon()}
                <TouchableOpacity 
                    style={touchableStyle}
                    onPress={() => this.setModalVisible(true)}
                >
                    <Text style={textStyle}>
                        {this.getCategoryText()}
                    </Text>
                </TouchableOpacity>
                {this.renderCategorySelector()}
            </View>
        );
    }

    renderCategorySelector() {
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
            >
                {this.renderCategories()}
            </Modal>
        );
    }

    renderCategories() {
        const { categories } = this.props;
        return (
            <FlatList 
                data={categories}
                renderItem={({ item }) => 
                    <CategoryRow
                        key={'category' + item.key}
                        categoryName={item.name}
                        iconName={item.icon}
                        onPress={() => this.selectCategory(item)}
                    />
                }    
            />  
        )
    }

    selectCategory(item) {
        this.props.categoryChanged(item.key);
        this.setModalVisible(false);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }
} 

const mapStateToProps = (state) => {
    return {
        selectedCategoryId: state.addTransaction.categoryId,
        categories: state.category.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryChanged: (categoryId) => dispatch(categoryChanged(categoryId))
    }
}

const TransactionCategoryInput = connect(mapStateToProps, mapDispatchToProps)(TransactionCategoryInput2);

export { TransactionCategoryInput };

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        flex: 1
    },
    touchableStyle: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 18,
        lineHeight: 30,
        flex: 2,
        textAlign: 'left'
    },
});