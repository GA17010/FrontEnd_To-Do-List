import { NextApiRequest, NextApiResponse } from 'next';

const tasks = [{ name: 'Primera tarea' }];


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      console.log('GET /api/tasks');
      res.status(200).json(tasks);
      break;
    case 'POST':
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'El name es requerido' });
      } else {
        const newTask = { id: tasks.length + 1, name };
        tasks.push(newTask);
        res.status(201).json(newTask);
      }
      console.log('POST /api/tasks');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
