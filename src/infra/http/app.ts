import 'reflect-metadata';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { ErrorHandling } from './errorHandling';
import { randomUUID } from 'crypto';
import { hashSync } from 'bcryptjs';

/* import '@container'; */

const users = [
  {
    id: '42f8e189-125d-48e6-a21f-bf2d8b04b4d1',
    name: 'João Silva',
    password: 'senha123',
    email: 'joao.silva@example.com',
    registration: '123456',
    address: 'Rua das Flores, 123',
    cpf: '123.456.789-10',
    job_role: 'Analista de Dados',
    pib: '123456789',
    telphone: '(11) 1234-5678',
    celphone: '(11) 98765-4321',
  },
  {
    id: '5020d108-37c4-4674-b5e4-0bb60a4f7e1a',
    name: 'Maria Santos',
    password: 'senha456',
    email: 'maria.santos@example.com',
    registration: '654321',
    address: 'Avenida Central, 456',
    cpf: '987.654.321-10',
    job_role: 'Desenvolvedor Web',
    pib: '987654321',
    telphone: '(21) 2222-3333',
    celphone: '(21) 99999-8888',
  },
  {
    id: 'a3c68044-85f7-4763-b5b4-f3f1cbf22ed0',
    name: 'Pedro Oliveira',
    password: 'senha789',
    email: 'pedro.oliveira@example.com',
    registration: '789012',
    address: 'Travessa dos Pinheiros, 789',
    cpf: '456.789.012-10',
    job_role: 'Engenheiro Civil',
    pib: '456789012',
    telphone: '(31) 4444-5555',
    celphone: '(31) 77777-6666',
  },
  {
    id: 'a15dab75-9a7c-477e-aedf-8a1ec79926b1',
    name: 'Ana Costa',
    password: 'senhaabc',
    email: 'ana.costa@example.com',
    registration: '456789',
    address: 'Rua das Palmeiras, 789',
    cpf: '789.012.345-10',
    job_role: 'Contadora',
    pib: '789012345',
    telphone: '(41) 6666-7777',
    celphone: '(41) 33333-8888',
  },
  {
    id: '8b1f9a2a-df80-4d7f-b2f4-f55c95d5f72b',
    name: 'Carlos Oliveira',
    password: 'senhaxyz',
    email: 'carlos.oliveira@example.com',
    registration: '987654',
    address: 'Avenida das Árvores, 987',
    cpf: '012.345.678-10',
    job_role: 'Professor',
    pib: '1234567890',
    telphone: '(51) 8888-9999',
    celphone: '(51) 22222-1111',
  },
  {
    id: '9bb7461b-0495-4943-8a35-5b5107401c5b',
    name: 'Juliana Santos',
    password: 'senha123',
    email: 'juliana.santos@example.com',
    registration: '234567',
    address: 'Alameda dos Passarinhos, 234',
    cpf: '234.567.890-10',
    job_role: 'Advogada',
    pib: '234567890',
    telphone: '(61) 7777-8888',
    celphone: '(61) 44444-3333',
  },
  {
    id: '9c99b9b0-8b43-4375-aeb8-556dce5f1a76',
    name: 'Lucas Pereira',
    password: 'senha456',
    email: 'lucas.pereira@example.com',
    registration: '345678',
    address: 'Praça das Estrelas, 345',
    cpf: '345.678.901-10',
    job_role: 'Arquiteto',
    pib: '345678901',
    telphone: '(71) 9999-8888',
    celphone: '(71) 22222-7777',
  },
  {
    id: 'e978028d-5747-45b0-b9b6-19fc5c3983b3',
    name: 'Fernanda Lima',
    password: 'senha789',
    email: 'fernanda.lima@example.com',
    registration: '567890',
    address: 'Rua dos Girassóis, 567',
    cpf: '456.789.012-10',
    job_role: 'Farmacêutica',
    pib: '456789012',
    telphone: '(81) 3333-4444',
    celphone: '(81) 88888-9999',
  },
  {
    id: '83280a79-c9e4-4d28-8d82-4e1c6887e489',
    name: 'Rafaela Almeida',
    password: 'senhaabc',
    email: 'rafaela.almeida@example.com',
    registration: '678901',
    address: 'Avenida dos Cravos, 678',
    cpf: '567.890.123-10',
    job_role: 'Enfermeira',
    pib: '567890123',
    telphone: '(91) 2222-3333',
    celphone: '(91) 77777-8888',
  },
  {
    id: '8e43ab89-af49-478b-ba95-148a87c39992',
    name: 'Rodrigo Martins',
    password: 'senhaxyz',
    email: 'rodrigo.martins@example.com',
    registration: '789012',
    address: 'Travessa das Margaridas, 789',
    cpf: '678.901.234-10',
    job_role: 'Engenheiro Eletricista',
    pib: '678901234',
    telphone: '(98) 4444-5555',
    celphone: '(98) 11111-2222',
  },
];

export const app = fastify();

app.register(cors, {
  allowedHeaders: '*',
  origin: '*',
});

//app.register(appRoutes);

app.setErrorHandler(ErrorHandling);
