import { PrismaClient } from '@prisma/client';

import { Role } from '@shared/enums';

const prisma = new PrismaClient();

const users = [
  {
    name: 'Ana Silva',
    email: 'ana.silva@hospital.com',
    password: 'admin123',
    role: Role.ADMIN,
  },
  {
    name: 'Carlos Pereira',
    email: 'carlos.pereira@hospital.com',
    password: 'editor123',
    role: Role.EDITOR,
  },
  {
    name: 'Fernanda Costa',
    email: 'fernanda.costa@hospital.com',
    password: 'clinico123',
    role: Role.CLINICAL,
  },
];

const pacientes = [
  {
    name: 'Alice Souza',
    birth_date: new Date('1993-05-15'),
    sex: 'feminino',
  },
  {
    name: 'Bob Oliveira',
    birth_date: new Date('1980-11-22'),
    sex: 'masculino',
  },
  {
    name: 'Carlos Martins',
    birth_date: new Date('1975-01-10'),
    sex: 'masculino',
  },
  { name: 'Diana Lima', birth_date: new Date('1998-03-05'), sex: 'feminino' },
  {
    name: 'Eduardo Rocha',
    birth_date: new Date('1990-09-30'),
    sex: 'masculino',
  },
  {
    name: 'Fernanda Gonçalves',
    birth_date: new Date('1988-07-12'),
    sex: 'feminino',
  },
  {
    name: 'Gabriel Santos',
    birth_date: new Date('1983-02-18'),
    sex: 'masculino',
  },
  {
    name: 'Helena Ferreira',
    birth_date: new Date('1992-06-25'),
    sex: 'feminino',
  },
  {
    name: 'Igor Almeida',
    birth_date: new Date('1985-12-15'),
    sex: 'masculino',
  },
  {
    name: 'Júlia Ribeiro',
    birth_date: new Date('1996-04-20'),
    sex: 'feminino',
  },
];

const doctors = [
  {
    name: 'Dr. João Martins',
    sex: 'masculino',
    crm: '123456-SP',
    phone: '5511999990001',
    email: 'joao.martins@hospital.com',
    birth_date: new Date('1975-04-10'),
    avatar_url: 'https://example.com/avatar1.jpg',
    specialty: 'Cardiologia',
    working_days: [1, 3, 5], // Segundas, quartas, sextas
  },
  {
    name: 'Dra. Maria Souza',
    sex: 'feminino',
    crm: '654321-RJ',
    phone: '5511999990002',
    email: 'maria.souza@hospital.com',
    birth_date: new Date('1980-12-20'),
    avatar_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMivCzphvfoMNWnDmyx4B9-2x9t818xbOkcw&s',
    specialty: 'Pediatria',
    working_days: [2, 4], // Terças e quintas
  },
  {
    name: 'Dr. Ricardo Alves',
    sex: 'masculino',
    crm: '789012-MG',
    phone: '5511999990003',
    email: 'ricardo.alves@hospital.com',
    birth_date: new Date('1982-09-15'),
    avatar_url: 'https://example.com/avatar3.jpg',
    specialty: 'Ortopedia',
    working_days: [1, 2, 5], // Segundas, terças e sextas
  },
  {
    name: 'Dra. Fernanda Oliveira',
    sex: 'feminino',
    crm: '321654-BA',
    phone: '5511999990004',
    email: 'fernanda.oliveira@hospital.com',
    birth_date: new Date('1990-05-18'),
    avatar_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKUabeWRx6T2GqZmeIwP4P7lVNHV3ghHDYGQ&s',
    specialty: 'Dermatologia',
    working_days: [3, 5], // Quartas e sextas
  },
  {
    name: 'Dr. Lucas Lima',
    sex: 'masculino',
    crm: '987654-RS',
    phone: '5511999990005',
    email: 'lucas.lima@hospital.com',
    birth_date: new Date('1987-03-30'),
    avatar_url: 'https://example.com/avatar5.jpg',
    specialty: 'Neurologia',
    working_days: [2, 4], // Terças e quintas
  },
];

async function seed() {
  await prisma.user.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  await prisma.user.createMany({
    data: users,
  });
  await prisma.patient.createMany({
    data: pacientes,
  });
  await prisma.doctor.createMany({
    data: doctors,
  });

  console.log('Usuários criados com sucesso:', users);
  console.log('Pacientes criados com sucesso:', pacientes);
  console.log('Médicos criados com sucesso:', doctors);
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
