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

function parseVcap(chartName) {
  let vcap = process.env.VCAP_SERVICES
  debugger
  var vcapJson = JSON.parse(vcap)[chartName][0].credentials.services

  var properties = {}
  var services = []

  vcapJson.forEach(function(service) {
    var ports = service['spec']['ports']
    var found = ports.find(function(el) {
      return el.name === 'rpc'
    })

    properties = {
      name: service['name'],
      IP: service['spec']['clusterIP'],
      NodePort: found.nodePort
    }
    services.push(properties)
  })
  let NETWORKS = {
    '77': {
      NAME: 'Sokol',
      RPC: 'https://sokol.poa.network',
      BRANCH: constants.SOKOL,
      TESTNET: true
    }
  }

  services = merge(NETWORKS, services)
  return services
}

function merge(x, y) {
  let newObject = {}
  var i = 0
  for (const key in x) {
    if (x.hasOwnProperty(key)) {
      const element = x[key]
      let arrElement = y[i]

      if (!arrElement) break

      element.NAME = arrElement.name
      element.RPC = `${arrElement.IP}:${arrElement.NodePort}`

      newObject[key] = element
    }
    i++
  }

  if (y.length > i) {
    y.forEach(element => {
      if (!newObject[element.key])
        newObject[element.key] = {
          name: element.name,
          RPC: `${element.IP}:${element.NodePort}`,
          BRANCH: 'core',
          TESTNET: 'false'
        }
    })
  }
  return newObject
}

constants.NETWORKS = parseVcap('poanode')

module.exports = {
  constants
}
