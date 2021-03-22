import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
// import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
    onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        
        await this.props.onApprove(this.props.id, accounts[0])
    };

    onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();

        await this.props.onFinalize(this.props.id, accounts[0])
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const { description, value, recipient, approvalCount } = request;
        const readyToFinalize = approvalCount > approversCount / 2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>{approvalCount}/{approversCount}</Cell>
                <Cell>
                    { request.complete ? null : (
                        <Button color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    ) }
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )
                    }
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;