import { PrismaClient } from '@prisma/client';

import { Role } from '@shared/enums';

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();
  await prisma.patient.deleteMany();

  const userAdmin = await prisma.user.create({
    data: {
      name: 'Ana Silva',
      email: 'ana.silva@hospital.com',
      password: 'admin123',
      role: Role.ADMIN,
    },
  });

  const userEditor = await prisma.user.create({
    data: {
      name: 'Carlos Pereira',
      email: 'carlos.pereira@hospital.com',
      password: 'editor123',
      role: Role.EDITOR,
    },
  });

  const userClinico = await prisma.user.create({
    data: {
      name: 'Fernanda Costa',
      email: 'fernanda.costa@hospital.com',
      password: 'clinico123',
      role: Role.CLINICAL,
    },
  });

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

  await prisma.patient.createMany({
    data: pacientes,
  });

  console.log({ userAdmin, userEditor, userClinico });
  console.log('Pacientes criados com sucesso:', pacientes);
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
