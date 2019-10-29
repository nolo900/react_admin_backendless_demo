import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { promised } from 'q';

const LOGIN_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/users/login`;
const GET_ROLES_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/services/UserService/UserRoles`;
const urls = [LOGIN_URL, GET_ROLES_URL]

export default (type, params) => {
    console.log(type, params);
    if (type === AUTH_LOGIN){
        const { username, password } = params;
        const request = new Request(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({ login: username, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        // const requestTwo = new Request(GET_ROLES_URL, {
        //     method: 'GET',
        //     headers: new Headers({ 'Content-Type': 'application/json', 'Accept': "application/json", 'user-token': localStorage.getItem('user-token') }),
        // });
        // const requests = [request, requestTwo]
        // const promises = requests.map(request => fetch(request))
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                console.log(response)
                return response.json();
            })
            .then(response => {
                console.log(response)
                localStorage.setItem('user-token', response['user-token']);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('user-token');
        return Promise.resolve()
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('user-token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        const requestTwo = new Request(GET_ROLES_URL, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json', 'Accept': "application/json", 'user-token': localStorage.getItem('user-token') }),
        });
        if (localStorage.getItem('user-token')) {
            console.log('token found');
            return Promise.resolve(requestTwo);
        } else {
            console.log('token not found');
            return Promise.reject();
        }
    }
    if (type === AUTH_GET_PERMISSIONS){
        const requestTwo = new Request(GET_ROLES_URL, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json', 'Accept': "application/json", 'user-token': localStorage.getItem('user-token') }),
        });
        if (localStorage.getItem('user-token')) {
            return Promise.resolve(requestTwo)
                    .then
        } else {
            return Promise.reject();
        }

        // const role = localStorage.getItem('role');
        // return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.reject('Unknown method');
}
