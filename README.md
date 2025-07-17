# Demo de Pruebas de Rendimiento con Grafana k6

Este proyecto contiene una colección de scripts de prueba usando [k6](https://k6.io/), ideal para evaluar el rendimiento de APIs o servicios web mediante distintos tipos de pruebas como:

- 🚦 Smoke test (Pruebas Rápidas)
- 🧍 Load test (Carga)
- 💣 Stress test (Estrés)
- 📈 Soak test (Resistencia)
- ⚡ Spike test (Picos repentinos)
- frontend (ui) test

---

## 📁 Estructura del proyecto

k6-demo/
├── README.md
└── scripts/
├── smoke-test.js
├── load-test.js
├── stress-test.js
├── soak-test.js
└── spike-test.js

## 🚀 Modo de uso

### ✅ Usando k6 localmente

Requisitos: 
- Node.js
- k6 CLI    

Puedes ejecutar cualquier script especificando las variables de entorno:

```bash
k6 run ./your-test.js --vus=10 --duration=10s
```

Si quieres ver las metricas en tiempo real en el navegador puedes usar el comando:

```bash
 K6_WEB_DASHBOARD=true run k6 run tu_script.js
```

### ✅ Usando Docker

Requisitos:
- Docker

```bash
docker run --rm -i grafana/k6 run - <your-test.js
```

## Variables de ejecución
| Parámetro      | Variable de entorno | Flag de CLI      | Ejemplo                   |
| -------------- | ------------------- | ---------------- | ------------------------- |
| Número de VUs  | `K6_VUS`            | `--vus`          | `--vus 10`                |
| Duración total | `K6_DURATION`       | `--duration`     | `--duration 30s`          |
| Salida JSON    | N/A                 | `--out json=...` | `--out json=results.json` |

## Variables internas de K6
K6 ofrece algunas variables globales especiales que puedes usar dentro de tus scripts:

| Variable | Descripción                                                                 |
|----------|------------------------------------------------------------------------------|
| `__VU`   | ID del Usuario Virtual actual (Virtual User). Comienza desde 1.             |
| `__ITER` | Número de iteración actual que ejecuta el VU. Comienza desde 0.             |
| `__ENV`  | Objeto que contiene las variables de entorno definidas al ejecutar el test. |# grafana-k6-demo
