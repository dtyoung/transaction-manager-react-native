import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { withNavigation } from 'react-navigation'; 
import { CardSection, Button, Card } from '../common';
import { categoryIconChanged, categoryNameChanged, addCategory, hasRedirected } from '../../actions/category';
import GridView from 'react-native-super-grid';

class AddCategoryForm extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false
        }
    }

    componentDidUpdate() {
        if(this.props.shouldRedirect) {
            
            this.props.hasRedirected();
            this.props.navigation.navigate('CategoryOverview');
            
        }
    }

    getIcon() {
        const { iconStyle } = styles;

        if(this.props.iconName) {
            return <Icon
            reverse
            reverseColor='black'
            color='#dddddd'
            containerStyle={iconStyle}
            name={this.props.iconName}
            size={50}
        />
        } else {
            return (
                <Icon
                    reverse
                    reverseColor='black'
                    color='#dddddd'
                    containerStyle={iconStyle}
                    type='font-awesome'
                    name='question'
                    size={50}
                />
            )
        }
    }

    render() {
        const { textInputStyle } = styles
        const { categoryName, iconName, nameChange, addCategory } = this.props;
        return (
            <Card>
                <CardSection>
                    <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => this.setModalVisible(true)}>
                        {this.getIcon()}
                    </TouchableOpacity>    
                </CardSection>
                <CardSection>
                    <TextInput 
                        placeholder="Category Name"
                        autoCorrect={true}
                        style={textInputStyle}
                        onChangeText={nameChange}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={() => addCategory(categoryName, iconName)}>
                        Add Category
                    </Button>
                </CardSection>
                {this.renderIconSelector()}
            </Card>
        );
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

    renderIconSelector() {
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
            >
                <View>
                    {this.renderCategoryIcons()}
                </View>
            </Modal>
        );
    }

    renderCategoryIcons() {
        return (
            <GridView
                itemDimension={100}
                items={this.props.categoryIcons}
                renderItem={ item => (
                    <TouchableOpacity onPress={() => this.selectIcon(item)}>
                        <Icon 
                            name={item}
                            size={100}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }

    selectIcon(item) {
        this.props.iconChange(item);
        this.setModalVisible(false);
    }

}

const mapStateToProps = (state) => {
    return {
        categoryName: state.category.categoryName,
        iconName: state.category.categoryIcon,
        categoryIcons: state.category.categoryIcons,
        shouldRedirect: state.category.shouldRedirect
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        iconChange: (icon) => dispatch(categoryIconChanged(icon)),
        nameChange: (name) => dispatch(categoryNameChanged(name)),
        addCategory: (name, icon) => dispatch(addCategory(name, icon)),
        hasRedirected: () => dispatch(hasRedirected()) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AddCategoryForm));

const styles = StyleSheet.create({
    iconStyle: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    textInputStyle: {
        flex: 1,
        alignSelf: 'center',
        color: '#007aaf',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    }
});