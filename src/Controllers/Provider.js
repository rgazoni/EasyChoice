// In order to verify db state, uncomment lines bellow line 5.
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
//const { db } = require('../Database');
// console.log(db.readyState);
// console.log(Provider);

const { Provider } = require('../Database/Schema/Provider');

const FetchProviders = async (provider) => {

    const Find = await Provider.find({ },'provider_name provider_id logo_path')
        .then(response => {
            //console.log(response);
            return response.map((item) => {
                return {
                    provider_name: item.provider_name,
                    provider_id: item.provider_id,
                    logo_path: 'https://image.tmdb.org/t/p/w500' + item.logo_path,
                }
            });
        }).catch(err => {
            return { err: err }
        });

    const data = {
        'total_results': Find.length,
        'results': Find
    };
    //console.log(data);
    return data;

}

module.exports = { FetchProviders };