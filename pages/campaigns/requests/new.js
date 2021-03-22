import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        loading: false,
        errorMessage: '',
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    };

    onSubmit = async (e) => {
        e.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({
            loading: true,
            errorMessage: '',
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .request(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0]
                });
            
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({
                errorMessage: err.message
            });
        }

        this.setState({ loading: false });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.parentNode.title]: e.target.value
        });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input title="description" onChange={this.onChangeHandler} value={this.state.description}  />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input title="value" onChange={this.onChangeHandler}  />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input title="recipient" onChange={this.onChangeHandler}  />
                    </Form.Field>
                    <Message error header="Opps!" content={this.state.errorMessage} />
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                            <Button style={{ marginRight: '10px' }}>Cancel</Button>
                        </a>
                    </Link>
                    <Button primary loading={ this.state.loading }>Create!</Button>
                </Form>
            </Layout>
        );
    };
};

export default RequestNew;