function parseVcap (chartName) {

  var vcap = process.env.VCAP_SERVICES
  var vcapJson = JSON.parse(vcap)[chartName][0]['credentials']['services']
  
  var properties = {} 
  var services = []
  
  vcapJson.forEach(function(service){

  var ports = service['spec']['ports']
  var found = ports.find(function(el){
    return el.name == "rpc"
  })
  	
  properties = { "name": service['name'], "IP": service['spec']['clusterIP'], "NodePort": found.nodePort }
  services.push(properties)	

  });

  let NETWORKS = {
      '77': {
        NAME: 'Sokol',
        RPC: 'https://sokol.poa.network',
        BRANCH: constants.SOKOL,
        TESTNET: true
      }
  }
  
  services=merge(NETWORKS,services)
  console.log(services)
  return services	
}

function merge(x,y) {
    
    let newObject = {}

    var i = 0

for (const key in x) {
    if (x.hasOwnProperty(key)) {
        const element = x[key]
        let arrElement = y[i]

        if (!arrElement)
            break
        
        element.NAME = arrElement.name
        element.RPC = `${arrElement.IP}:${arrElement.NodePort}`

        newObject[key] = element
    }
    i++
}
    
    if (y.length > i)
    {
        y.forEach(element => {
            if (!newObject[element.key])
                newObject[element.key] = { name: element.name, RPC: `${element.IP}:${element.NodePort}`, BRANCH: "core", TESTNET:"false"}
        });
    }
    return newObject
}