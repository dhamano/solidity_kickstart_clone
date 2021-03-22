import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequetsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        return { address, requests, requestCount, approversCount };
    };

    onApprove = async (index, account) => {
        const campaign = Campaign(this.props.address);
        try {
            await campaign.methods.approveRequest(index).send({
                from: account
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    onFinalize = async (index, account) => {
        const campaign = Campaign(this.props.address);
        try {
            await campaign.methods.finalizeRequest(index).send({
                from: account
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={`request-${index}`}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
                onApprove={this.onApprove}
                onFinalize={this.onFinalize}
            />;
        })
    };

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button floated="right" style={{ marginBottom: '10px' }} primary content="Add Request" icon="add circle" />
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        { this.renderRows() }
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    };
};

export default RequestIndex;