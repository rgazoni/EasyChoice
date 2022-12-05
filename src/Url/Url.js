module.exports = class Url {
    
    domain = 'https://api.themoviedb.org';
    path = '/3/discover/movie';
    api_key = `api_key=${process.env.API_KEY}`;
    language = 'language=pt-BR';

    constructor(){}

    toString(){
        return `${this.domain}${this.path}?${this.api_key}&${this.language}`;
    }
}