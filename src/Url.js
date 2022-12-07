module.exports = class Url {

    domain = 'https://api.themoviedb.org';
    path = '/3/discover/movie';
    api_key = `api_key=${process.env.API_KEY}`;
    
    //Only BR for dev purposes
    language = 'language=pt-BR';
    watch_region = 'BR';

    baseUrl = `${this.domain}${this.path}?${this.api_key}&${this.language}&watch_region=${this.watch_region}&sort_by=primary_release_date.desc`;

    currentUrl = this.baseUrl;

    addParam(paramName, paramValue){
        this.currentUrl = this.currentUrl + `&${paramName}=${paramValue}`;
    }

    getUrl(){
        return this.currentUrl;
    }
}