const local = {
    VOTING_TO_CHANGE_KEYS_ADDRESS: '0x758492834ed6454f41d6d3d6b73d6e46d4555429',
    VOTING_TO_CHANGE_MIN_THRESHOLD: '0xcbf043db3498b5064bd62341be0c0e3fb0344b1b',
    VOTING_TO_CHANGE_PROXY: '0xcb3f870269a3f7215eb87d9548ee5b7eff6396dd',
    BALLOTS_STORAGE_ADDRESS: '0x144947d78b932ea0dff14d75e1f7cd1b2f131426',
    METADATA_ADDRESS: '0x3111c94b9243a8a99d5a867e00609900e437e2c0',
    POA_ADDRESS: '0xf472e0e43570b9afaab67089615080cf7c20018d',
}

const CORE_ADDRESSES = {
    VOTING_TO_CHANGE_KEYS_ADDRESS: '0x49df4ec19243263e5db22da5865b4f482b8323a0',
    VOTING_TO_CHANGE_MIN_THRESHOLD: '0x8829ebe113535826e8af17ed51f83755f675789a',
    VOTING_TO_CHANGE_PROXY: '0x6b728399b41a38d4109f7af2213d4cc31ca87812',
    BALLOTS_STORAGE_ADDRESS: '0x0d7590c7aedf1e7e85fc9a1ee88f6f17d3ba762f',
    METADATA_ADDRESS: '0xcBB2912666c7e8023B7ec78B6842702eB26336aC',
    POA_ADDRESS: '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
}

const SOKOL_ADDRESSES = {
    VOTING_TO_CHANGE_KEYS_ADDRESS: '0x145a3d3bd5db8a0ad863b4949b6088d133726cdb',
    VOTING_TO_CHANGE_MIN_THRESHOLD: '0xad623f870298774765bc5e56ebeafac721028867',
    VOTING_TO_CHANGE_PROXY: '0x6fb85b2030a68a76ab237d2392b09e28e6f03fa9',
    BALLOTS_STORAGE_ADDRESS: '0x1e0eaa06d02f965be2dfe0bc9ff52b2d82133461',
    METADATA_ADDRESS: '0xce9ff1123223d13672cce06dd073d3749764daa6',
    POA_ADDRESS: '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
}

module.exports = (netId) => {
    switch (netId) {
        case '77':
            return SOKOL_ADDRESSES
        case '99':
            return local
        default:
            return local
    }
}

