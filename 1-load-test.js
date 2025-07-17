import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://scholarship-service-local.ctdesarrollo.org/api/v1/';
const ENDPOINTS = {
    BASE_URL: 'https://scholarship-service-local.ctdesarrollo.org/api/v1/',
    getAllForms: BASE_URL + 'scholarship-application-requests',
    getDetailsOneForm: (uuid) => `${BASE_URL}scholarship-application-requests/${uuid}/personal-details`,
};

export let options = {
    stages: [
        { duration: '30s', target: 20 },  // ramp-up hasta 20 VUs
        { duration: '1m', target: 20 },   // mantén 20 VUs
        { duration: '30s', target: 0 },   // ramp-down
    ],
};

export default function () {
    const myVU = __VU;

    console.log('test get all forms with vu:' + myVU);
    
    const responseAllForms = http.get(ENDPOINTS.getAllForms);
    check(responseAllForms, { 'getAllForms status 200': (r) => r.status === 200 });

    const forms = responseAllForms.json();
    let index = (myVU - 1) % forms.length; //Obtener un index existente
    const form = forms[index];

    console.log('get person details:' + myVU);

    const responsePersonalDetails = http.get(ENDPOINTS.getDetailsOneForm(form.uuid));
    check(responsePersonalDetails, { 'personalDetails status 200': (r) => r.status === 200 });

    sleep(1);
}