const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  const abi = [
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: 'address', name: '', type: 'address' },
      ],
      name: 'Winner',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'address', name: 'erc20', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'drop',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]

  const token = require('../artifacts/contracts/GoofyGoober.sol/GoofyGoober.json')

  const tokenContract = await ethers.getContractAt(
    token.abi,
    '0x03CEb3db28868268Cc08f5Abb72BF2a06845AE43',
    deployer
  )

  const contract = await ethers.getContractAt(
    abi,
    '0x873289a1aD6Cf024B927bd13bd183B264d274c68',
    deployer
  )

  const approveTx = await tokenContract.approve(
    contract.address,
    ethers.utils.parseEther('1')
  )
  console.log('Approving token...')
  await approveTx.wait()
  console.log('Approved!')

  const dropTx = await contract.drop(
    tokenContract.address,
    ethers.utils.parseEther('1')
  )
  console.log('Dropping token...')
  await dropTx.wait()
  console.log('Dropped!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
