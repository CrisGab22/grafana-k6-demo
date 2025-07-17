import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,
    duration: '40s',
};

// Smoke Test
export default function () {
    const currentVU = __VU
    const route = 'https://jsonplaceholder.typicode.com/users/' + currentVU;
    console.log('esto lo esta ejecutando el vu: '+ currentVU + ` ejecutando ruta: ${route}` + `, en la iteracion ${__ITER}`);

    const res = http.get(route);

    check(res, {
        'status ok (code 200)': (r) => r.status === 200,
    });

    sleep(1);
}














//Agregar dinamismo con vu
// k6 run --vus 10 --duration 10s basic-test.js
/*
    export let options = {
        vus: 10,
        duration: '10s',
    };
*/