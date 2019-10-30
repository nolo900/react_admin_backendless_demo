import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';

const LOGIN_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/users/login`;
const GET_USER_ROLES_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/services/UserService/UserRoles`;


export default (type, params) => {
    console.log(type, params);
    if (type === AUTH_LOGIN){
        const { username, password } = params;
        const loginRequest = new Request(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({ login: username, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(loginRequest)
            .then(response => {
                if (response.status < 200 || response.status >= 300) { throw new Error(response.statusText) }
                return response.json();
            })
            .then(response => {
                localStorage.setItem('user-token', response['user-token']);
            })
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('user-token');
        localStorage.removeItem('roles');
        return Promise.resolve()
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('user-token');
            localStorage.removeItem('roles');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        if (localStorage.getItem('user-token')) {
            console.log('token found');
            return Promise.resolve();
        } else {
            console.log('token not found');
            return Promise.reject();
        }
    }
    if (type === AUTH_GET_PERMISSIONS){
        let roles = localStorage.getItem('roles');

        if (!roles){
            // query for roles
            const rolesRequest = new Request(GET_USER_ROLES_URL, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('user-token')
                }),
            });

            fetch(rolesRequest)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) { throw new Error(response.statusText) }
                    return response.json();
                })
                .then(res => {
                    localStorage.setItem('roles', res);
                    roles = res;
                })
        }
        return roles ? Promise.resolve(roles) : Promise.reject();
    }
    return Promise.reject('Unknown method');
}
