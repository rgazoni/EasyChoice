module.exports = class Url {

    domain = 'https://api.themoviedb.org';
    path = '/3/discover/movie';
    api_key = `api_key=${process.env.API_KEY}`;
    
    //Only BR for dev purposes
    language = 'language=pt-br';
    watch_region = 'BR';

    baseUrl = `${this.domain}${this.path}?${this.api_key}&${this.language}&watch_region=${this.watch_region}`;
    //TODO try to maxime movies with overview and backdrop

    currentUrl = this.baseUrl;

    /**
     * Options to add persistent parameters to the URL [
     * with_watch_providers: provider_id ]
     */ 
    addParam(paramName, paramValue){
        this.currentUrl = this.currentUrl + `&${paramName}=${paramValue}`;
    }

    toString(){
        return this.currentUrl;
    }
}