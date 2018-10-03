import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from '../common';

class CreateAccountForm extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@gmail.com"
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Confirm Password"
                        placeholder="confirm password"
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        Create Account
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default CreateAccountForm;