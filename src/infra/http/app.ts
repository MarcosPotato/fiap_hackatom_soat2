import 'reflect-metadata';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { ErrorHandling } from './errorHandling';

import '@shared/container';

export const app = fastify();

app.register(cors, {
  allowedHeaders: '*',
  origin: '*',
});

//app.register(appRoutes);

app.setErrorHandler(ErrorHandling);
