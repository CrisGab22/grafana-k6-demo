import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 5,
    iterations: 10
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/'

export default function() {
    console.log("# User:" + __VU + ", # iteracion: " + __ITER)

    const res = http.get(BASE_URL + __VU )
    check( res,{
        'status was 200': (res) => res.status === 200,
        'check userId': (res) => res.json().userId !=  undefined
    })

    sleep(1)
}