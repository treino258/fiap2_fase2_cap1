import { Paciente } from '../schemas/paciente';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchPacientes(): Promise<Paciente[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Erro ao buscar pacientes: ${response.status}`);
  }
  const data = await response.json();
  return data as Paciente[];
}
