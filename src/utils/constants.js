let constants = {}
constants.organization = 'poanetwork'
constants.repoName = 'poa-chain-spec'
constants.addressesSourceFile = 'contracts.json'
constants.ABIsSources = {
  KeysManager: 'KeysManager.abi.json',
  PoaNetworkConsensus: 'PoaNetworkConsensus.abi.json',
  BallotStorage: 'BallotsStorage.abi.json',
  EmissionFunds: 'EmissionFunds.abi.json',
  ProxyStorage: 'ProxyStorage.abi.json',
  ValidatorMetadata: 'ValidatorMetadata.abi.json',
  VotingToChangeKeys: 'VotingToChangeKeys.abi.json',
  VotingToChangeMinThreshold: 'VotingToChangeMinThreshold.abi.json',
  VotingToChangeProxyAddress: 'VotingToChangeProxyAddress.abi.json',
  VotingToManageEmissionFunds: 'VotingToManageEmissionFunds.abi.json'
}

constants.NEW_MINING_KEY = {
  label: 'New Mining Key',
  lastNameAndKey: '',
  fullName: '',
  value: '0x0000000000000000000000000000000000000000'
}

constants.minBallotDurationInDays = 2
constants.startTimeOffsetInMinutes = 5
constants.endTimeDefaultInMinutes = 2890
constants.getTransactionReceiptInterval = 5000
constants.rootPath = '/poa-dapps-voting'

constants.navigationData = [
  {
    icon: 'all',
    title: 'All',
    url: `${constants.rootPath}`
  },
  {
    icon: 'active',
    title: 'Active',
    url: `${constants.rootPath}/active`
  },
  {
    icon: 'finalize',
    title: 'To Finalize',
    url: `${constants.rootPath}/tofinalize`
  },
  {
    disabled: true,
    title: 'New Ballot',
    url: `${constants.rootPath}/new`
  }
]

constants.SOKOL = 'sokol'
constants.CORE = 'core'
constants.DAI = 'dai'

let vcap = process.env.VCAP_SERVICES
let vcapJson = JSON.parse(vcap)
let vcapKeys = Object.keys(JSON.parse(vcap))
// Search throught VCAP_SERVICES for service with label
// for now we suppose that only one per chart kibosh service
// binded to app. TODO: make it possible to bind several service
// instances from one sourse
const filtered = Object.keys(vcapJson)
  .filter(key => vcapJson[key][0].label == 'poanode')
  .reduce((obj, key) => {
    obj = vcapJson[key][0]
    return obj
  }, {})
const k8sSecrets = filtered.credentials.secrets
// Kubernetes services object, gathered from VCAP
const k8sSvcs = filtered.credentials.services
// Filter services. For now we need tcp services, related to label poanode
const k8sTCPSvcs = k8sSvcs.filter(service => service.name.includes('tcp') && service.name.includes('poanode'))
let newObj = {}
k8sTCPSvcs.forEach(function(service) {
  // TODO: check service spec
  let conf = {}
  let confValue = {}
  // Filter ports
  let rpcPort = service.spec.ports.filter(port => port.name == 'rpc')[0]
  // Filter secrets
  let namePrefixArray = service.name.split('-')
  let namePrefix = namePrefixArray[namePrefixArray.length - 1]
  let filteredConfValues = k8sSecrets.filter(secret => secret.name.includes(namePrefix))
  if (filteredConfValues.length == 1) {
    confValue = filteredConfValues[0]
  }
  let externalIP = service.status.loadBalancer.ingress
  if (externalIP.length == 1) {
    conf.RPC = 'http://' + externalIP[0].ip + ':' + rpcPort.port
  }
  conf.BRANCH = confValue.data.branch
  conf.TESTNET = confValue.data.testnet.replace(/['"]+/g, '')
  conf.NAME = service.name
  newObj[confValue.data.chainid.replace(/['"]+/g, '')] = conf
})

//constants.NETWORKS = parseVcap('poanode')
debugger
constants.NETWORKS = newObj

module.exports = {
  constants
}
