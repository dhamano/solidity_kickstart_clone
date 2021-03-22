import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Input, Form, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false,
    };

    onChangeMinContribution = (e) => {
        this.setState({
            minimumContribution: e.target.value
        });
    };

    setErrMsg = (msg) => {
        this.setState({ errorMessage: msg });
        this.setState({ loading: false });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
            errorMessage: ''
        })
        let testValue = this.state.minimumContribution;

        if (testValue === '') {
            this.setErrMsg('Campaign must have a minimum contribution amount');
            return;
        } else if (!parseInt(testValue)) {
            this.setErrMsg('Minimum Contribution must be a number with no commas');
            return;
        } else {
            try {
                const accounts = await web3.eth.getAccounts();
                await factory.methods
                    .createCampaign(this.state.minimumContribution)
                    .send({
                        from: accounts[0]
                    });
                
                Router.pushRoute('/');
            } catch (err) {
                this.setState({
                    errorMessage: err.message
                });
            }
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input onChange={this.onChangeMinContribution} value={this.state.minimumContribution} label="Wei" labelPosition="right" />
                    </Form.Field>
                    <Message error header="Opps!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} type="submit" primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;