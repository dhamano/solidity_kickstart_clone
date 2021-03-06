import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address,
            minimumContribution: summary['0'],
            balance: summary['1'],
            requestsCount: summary['2'],
            approversCount: summary['3'],
            manager: summary['4'],
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager that created this campaign and can create requests to withdraw funds.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (Wei)',
                description: 'You must contribute at least this much wei to become an approver.'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donate to this campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (Ether)',
                description: 'The balance is how much money this campaign has left to spend.'
            },
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Request</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>  
        );
    }
};

export default CampaignShow;