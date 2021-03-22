import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xd0FF27e04633Dea2609ca3f7A9941a5E4383af48'
)

export default instance;