module.exports = class Url {

    domain = 'https://api.themoviedb.org';
    path = '/3/discover/movie';
    api_key = `api_key=${process.env.API_KEY}`;
    baseUrl = `${this.domain}${this.path}?${this.api_key}`;

    options = {
        language : 'pt-br',
        watch_region : 'BR',
        with_watch_providers: undefined,
        with_genres: undefined,
        page: undefined
    }

    /**
     * Options to add persistent parameters to the URL [
     * with_watch_providers: provider_id ]
     */ 
    addParam(paramName, paramValue){
        this.options[paramName] = paramValue;
    }

    toString(){
        let params = '';
        Object.entries(this.options).forEach(([key, value]) => {
            if(value!==undefined)
                params = params + '&' + key + '=' + value;
        });
        //console.log(this.baseUrl + params);
        return this.baseUrl + params;
    }
}