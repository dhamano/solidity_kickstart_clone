import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onChangeHandler = (e) => {
        this.setState( { value: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        
        const campaign = Campaign(this.props.address);

        this.setState({
            loading: true,
            errorMessage: '',
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether'),
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({
            value: '',
            loading: false
        })
    }

    
    render() {
        console.log(this.props.address);
        return (
            <Form onSubmit={this.onSubmit} error={ !!this.state.errorMessage }>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input value={this.state.value} onChange={this.onChangeHandler} label="ether" labelPosition="right" />
                </Form.Field>
                <Message error header="Opps!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form>
        )
    }
};

export default ContributeForm;