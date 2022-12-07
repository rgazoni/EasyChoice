const { Genre } = require('../Database/Schema/Genre');

const FetchGenres = async () => {
    const Find = await Genre.find({  })
        .then(response => {
            //console.log(response);
            return response;
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

module.exports = {
    FetchGenres: FetchGenres
};