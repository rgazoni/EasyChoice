// In order to verify db state, uncomment lines bellow line 5.
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
//const { db } = require('../Database');
// console.log(db.readyState);
// console.log(Provider);

const { Provider } = require('../Database/Schema/Provider');

const FetchProviderId = async (provider) => {

    const Find = await Provider.find({ 'provider_name': provider })
        .then(response => {
            //console.log(response);
            return response;
        }).catch(err => {
            return { provider_id: -1, err: err }
        });

    if (Find.length === 0) {
        return { provider_id: -1, err: 'Provider not found' };
    }

    const provider_id = Find[0].provider_id;
    //console.log(provider_id);

    return { provider_id: provider_id }

}

module.exports = FetchProviderId;