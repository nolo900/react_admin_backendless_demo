import { stringify } from "query-string";
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY
} from 'react-admin';

/**
 * This is a somewhat restful connector between react-admin and backendless
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sortBy=name desc,start asc&pageSize=5&offset=0
 *                                        Ex: ?sortBy=name%20desc%2Cstart%20asc&pageSize=5&offset=0
 * GET_ONE      => GET http://my.api.url/posts/123
 *                                        Ex: /18E32556-95F0-AA14-FF55-885FCF2A8500
 * GET_MANY     => GET http://my.api.url/posts?where=objectId in ('18E32556-95F0-AA14-FF55-885FCF2A8500','241DADE8-3604-2BCB-FFBF-967568A01C00')
 *                                        Ex:  where=objectId%20in%20('18E32556-95F0-AA14-FF55-885FCF2A8500'%2C'241DADE8-3604-2BCB-FFBF-967568A01C00')
 * UPDATE       => PUT http://my.api.url/posts/18E32556-95F0-AA14-FF55-885FCF2A8500
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/18E32556-95F0-AA14-FF55-885FCF2A8500
 */

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        console.log(type, resource, params);
        let url = '';
        let options = {};
        options['headers'] = new Headers({
            Accept: 'application/json',
            'user-token': localStorage.getItem('user-token')
        });

        switch (type) {
            case GET_LIST: {
                const { page,  perPage } = params.pagination;
                let   { field, order   } = params.sort;
                // adjust to match Backendless
                if (field === 'id') { field = 'objectId' }; // map id to Backendless objectId

                let whereClause;
                let lastQuery = Object.entries(params.filter).pop();
                if (lastQuery){
                    whereClause = `${lastQuery[0]} LIKE '%${lastQuery[1]}%'`;
                }

                const query = {
                    sortBy: `${field} ${order}`,
                    pageSize: perPage,
                    offset: page - 1,
                    where: whereClause,
                }

                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                // let objectIds = params.ids.map(id => `'${id}'` ).toString();
                // const query = {
                //     where: JSON.stringify(`objectId in (${objectIds})`),
                // };
                const query = {}
                // url = `${apiUrl}/${resource}?${stringify(query)}`;
                url = `${apiUrl}/${resource}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page,  perPage } = params.pagination;
                let   { field, order   } = params.sort;
                // adjust to match Backendless
                if (field === 'id') { field = 'objectId' }; // map id to Backendless objectId

                //TODO make sure this works
                const query = {
                    sortBy: `${field} ${order}`,
                    pageSize: perPage,
                    offset: page - 1,
                    // filter: JSON.stringify({
                    //     ...params.filter,
                    //     [params.target]: params.id,
                    // }),
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                delete params.data.id; // Prevents ID column from being created, Backendless uses objectId as PrimaryKey
                options.body = JSON.stringify(params.data);
                break;
            case UPDATE_MANY:
                url = `${apiUrl}/${resource}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            case DELETE_MANY:
                url = `${apiUrl}/${resource}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    // return the final json
    return (type, resource, params) => {
        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );

        if (type === GET_LIST){
            let objCountUrl = `${apiUrl}/${resource}/count`;

            return Promise.all([
                httpClient(url,options),
                httpClient(objCountUrl,options)
            ]).then(responses => ({
                data: responses[0].json.map(x => ({ id: x.objectId, ...x })),
                total: responses[1].json
            }))
        }

        if (type === GET_ONE){
            return httpClient(url, options).then(res => {
                return { data: { id: res.json.objectId, ...res.json } }
            })
        }

        // if type === GET_MANY
        if (type === GET_MANY){
            return Promise.all(
                params.ids.map(id => httpClient(`${url}/${id}`,options))
            ).then(responses => {

                console.log( {data: responses.map(res => ( {id: res.json.objectId, ...res.json } ) ) } )
                let data = responses.map(res => ( {id: res.json.objectId, ...res.json } ) );
                // return {data: responses.map(res => ( {id: res.json.objectId, ...res.json } ) ) }
                return { data: data };
            });
        }

        // if type === GET_MANY_REFERENCE

        if (type === CREATE){
            return httpClient(url,options).then( res => {
                return { data: { id: res.json.objectId, ...res.json } }
            })
        }

        if (type === UPDATE){
            return httpClient(url,options).then(res => {
                return { data: { id: res.json.objectId, ...res.json } }
            })
        }

        if (type === UPDATE_MANY){
            return Promise.all(
                params.ids.map(id => httpClient(`${url}/${id}`,options))
            ).then(responses => ({
                data: responses.map(res => res.json)
            }));
        }

        if (type === DELETE){
            return httpClient(url,options).then( res => {
                return { data: { id: res.json.objectId, ...res.json } }
            })
        }

        if (type === DELETE_MANY){
            return Promise.all(
                params.ids.map(id => httpClient(`${url}/${id}`,options))
            ).then(responses => ({
                data: responses.map(res => res.json)
            }))
        }

    }
}
