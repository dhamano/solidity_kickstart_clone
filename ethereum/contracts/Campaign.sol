pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);

        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount; // because you cannot loop through a mapping, must keep count of approvals separately
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    function request(
        string desc,
        uint256 val,
        address recipient
    ) public restricted {
        Request memory newRequest =
            Request({
                description: desc,
                value: val,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });

        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        Request storage currRequest = requests[index];

        require(approvers[msg.sender]);
        require(!currRequest.approvals[msg.sender]);

        if (!currRequest.approvals[msg.sender]) {
            currRequest.approvalCount++;
            currRequest.approvals[msg.sender] = true;
        }
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage currRequest = requests[index];

        require(currRequest.approvalCount > (approversCount / 2));
        require(!currRequest.complete);

        currRequest.recipient.transfer(currRequest.value);
        currRequest.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequetsCount() public view returns (uint256) {
        return requests.length;
    }
}
