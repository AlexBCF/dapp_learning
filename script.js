const contractAddress = "0xF0C316246F81D68bf4B2BCe56bB1210F73367c16";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_note",
				"type": "string",
			}
		],
		"name": "setNote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "getNote",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			}
		],
		"stateMutability": "view",
		"type": "function",
	},
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

async function setNote() {
    const note = document.getElementById("note").value;
    await contract.setNote(note);
}

async function getNote(){
    const note = await contract.getNote();
    document.getElementById("result").innerText = note;
}