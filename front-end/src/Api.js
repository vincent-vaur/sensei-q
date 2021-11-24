import axios from 'axios'

/**
 * Retourne la file d'attente
 */
export const fetchQueue = () => axios.get('http://localhost:3001/queue');

/**
 * Ajoute le nom donné à la file
 */
export const addToQueue = (name) => axios.post('http://localhost:3001/queue', { name });
