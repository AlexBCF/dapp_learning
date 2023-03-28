const contractAddress = "0xfCCf464bE7BcBED54f877E9f499dd6B8e26ebdf3";
const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_move",
				"type": "string",
			}
		],
		"name": "play_the_game",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			}
		],
		"stateMutability": "payable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			}
		],
		"name": "player_loses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			}
		],
		"name": "player_wins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			}
		],
		"stateMutability": "view",
		"type": "function",
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

provider.send("eth_requestAccounts", []).then(()=>{
    provider.listAccounts().then((accounts)=> {
        signer = provider.getSigner(accounts[0])
        contract = new ethers.Contract(contractAddress, abi, signer);
    });
});

async function rock() {
    const note = 'rock';
    const amount = document.getElementById("amount").value;
    const strAmount = amount.toString();
    await contract.play_the_game(note, {value: ethers.utils.parseUnits(strAmount)});
}


async function getNote(){
    const wins = await contract.player_wins(signer.getAddress());
    const loses = await contract.player_loses(signer.getAddress());
    document.getElementById("result_w").innerText = wins.toString();
    document.getElementById("result_l").innerText = loses.toString();
}