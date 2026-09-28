import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const getSimulationStatus = () => api.get('/cablecar/simulation/status');
export const startSimulation = () => api.post('/cablecar/simulation/start');
export const stopSimulation = () => api.post('/cablecar/simulation/stop');
export const getTelemetry = () => api.get('/cablecar/telemetry');
export const getAlerts = () => api.get('/cablecar/alerts');
export const getCorridors = () => api.get('/cablecar/corridors');
export const getCableCars = () => api.get('/cablecar/cable-cars');

export default api;


