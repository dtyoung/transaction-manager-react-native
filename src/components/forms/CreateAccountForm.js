import React, { Component } from 'react';
import { Text } from 'react-native'
import { Card, CardSection, Input, Button, Spinner } from '../common';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { 
    createEmailChanged,
    createPasswordChanged,
    createConfirmPasswordChanged,
    createAccount,
    loginUserCompleted
} from '../../actions/auth';

class CreateAccountForm extends Component {

    componentDidUpdate() {
        // Check to see if the login was a success
        if(this.props.success === true) {
            this.props.createUserComplete();
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        const { email, password, confirmPassword } = this.props;

        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@email.com"
                        value={email}
                        onChangeText={this.props.emailChanged}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        value={password}
                        onChangeText={this.props.passwordChanged}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Confirm Password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChangeText={this.props.confirmPasswordChanged}
                    />
                </CardSection>
                {this.renderErrorMessage()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }

    renderErrorMessage() {
        console.log('Error', this.props.error);
        if(this.props.error != '') {
            
            return (
                <CardSection>
                    <Text>{this.props.error}</Text>
                </CardSection>
            )
        } else {
            return null;
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />;
        } else {
            const { email, password, confirmPassword } = this.props;
            return (
                <Button onPress={() => this.props.createAccount(email, password, confirmPassword)}>
                    Create Account
                </Button>
            );
        }
    }
}



const mapStateToProps = (state) => {
    return {
        email: state.auth.createEmail,
        password: state.auth.createPassword,
        confirmPassword: state.auth.createConfirmPassword,
        error: state.auth.error,
        success: state.auth.createSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        emailChanged: (email) => dispatch(createEmailChanged(email)),
        passwordChanged: (password) => dispatch(createPasswordChanged(password)),
        confirmPasswordChanged: (confirmPassword) => dispatch(createConfirmPasswordChanged(confirmPassword)),
        createAccount: (email, password, confirmPassword) => dispatch(createAccount(email, password, confirmPassword)),
        createUserComplete: () => dispatch(loginUserCompleted)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CreateAccountForm));