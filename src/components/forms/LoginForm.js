import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { Text, View, StyleSheet } from 'react-native' 
import { emailChanged, passwordChanged, loginUser } from '../../actions/auth';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    componentDidUpdate() {
        // Check to see if the login was a success
        if(this.props.success === true) {
            this.props.navigation.navigate('App');
        }
    }

    renderLoginButton() {
        if (this.props.loading) {
            return <Spinner />;
        } else {
            return (
                <Button onPress={() => this.props.loginUser(this.props.email, this.props.password)}>
                    Login
                </Button>
            );
        }
    }

    renderError() {
        if(this.props.error !== '') {
            return (
                <CardSection>
                    <View style={styles.errorContainerStyle}>
                        <Text style={styles.errorStyle}>{this.props.error}</Text>
                    </View>
                </CardSection>
            );
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email} 
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderLoginButton()}
                </CardSection>

                <CardSection >
                    <Text onPress={() => this.props.navigation.navigate('CreateAccount')}>Don't have an account? Create one here!</Text>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        success: state.auth.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        emailChanged: (email) => dispatch(emailChanged(email)),
        passwordChanged: (password) => dispatch(passwordChanged(password)),
        loginUser: (email, password) => dispatch(loginUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginForm));

const styles = StyleSheet.create({
    errorStyle: {
       color: 'red',
       alignSelf: 'center',
    },
    errorContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' 
    }
});