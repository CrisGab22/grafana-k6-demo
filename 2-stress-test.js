import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://scholarship-service-local.ctdesarrollo.org/api/v1/';
const ENDPOINTS = {
  getAllForms: BASE_URL + 'scholarship-application-requests',
  getDetailsOneForm: (uuid) => `${BASE_URL}scholarship-application-requests/${uuid}/personal-details`,
};

export let options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '10s',  target: 50 }, 
    { duration: '10s', target: 100 }, 
    { duration: '10s', target: 100 }, 
    { duration: '30s', target: 0 }, 
  ],
};

export default function () {
  const myVU = __VU;

  const responseAllForms = http.get(ENDPOINTS.getAllForms);

  check(responseAllForms, {
    'status of getAllForms was 200': (r) => r.status === 200,
  });
  console.log(`El VU #${myVU} está está obteniendo todos los resultados`);


  const forms = responseAllForms.json();

  let index = myVU - 1;
  if ( index > forms.length) {
    index = 10;
  }

  const form = forms[index];
  console.log(`El VU #${myVU} está siguiendo el formulario con UUID: ${form.uuid}`);

  const responsePersonalDetails = http.get(ENDPOINTS.getDetailsOneForm(form.uuid));

  check(responsePersonalDetails, {
    'status of personalDetails was 200': (r) => r.status === 200,
  });

  sleep(1);
}