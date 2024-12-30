import { PrismaClient, Role, Sex } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    name: 'Admin Tester',
    email: 'admin.tester@hospital.com',
    password: 'admin123',
    role: Role.ADMIN,
  },
  {
    name: 'Editor Tester',
    email: 'editor.tester@hospital.com',
    password: 'editor123',
    role: Role.EDITOR,
  },
  {
    name: 'Clínico Tester',
    email: 'clinico.tester@hospital.com',
    password: 'clinico123',
    role: Role.CLINICAL,
  },
];

const pacientes = [
  {
    name: 'Alice Souza',
    birth_date: new Date('1993-05-15'),
    sex: Sex.FEMALE,
  },
  {
    name: 'Bob Oliveira',
    birth_date: new Date('1980-11-22'),
    sex: Sex.MALE,
  },
  {
    name: 'Carlos Martins',
    birth_date: new Date('1975-01-10'),
    sex: Sex.MALE,
  },
  { name: 'Diana Lima', birth_date: new Date('1998-03-05'), sex: Sex.FEMALE },
  {
    name: 'Eduardo Rocha',
    birth_date: new Date('1990-09-30'),
    sex: Sex.MALE,
  },
  {
    name: 'Fernanda Gonçalves',
    birth_date: new Date('1988-07-12'),
    sex: Sex.FEMALE,
  },
  {
    name: 'Gabriel Santos',
    birth_date: new Date('1983-02-18'),
    sex: Sex.MALE,
  },
  {
    name: 'Helena Ferreira',
    birth_date: new Date('1992-06-25'),
    sex: Sex.FEMALE,
  },
  {
    name: 'Igor Almeida',
    birth_date: new Date('1985-12-15'),
    sex: Sex.MALE,
  },
  {
    name: 'Júlia Ribeiro',
    birth_date: new Date('1996-04-20'),
    sex: Sex.FEMALE,
  },
];

const doctors = [
  {
    name: 'Dr. João Martins',
    sex: Sex.MALE,
    crm: '123456-SP',
    phone: '5511999990001',
    email: 'joao.martins@hospital.com',
    birth_date: new Date('1975-04-10'),
    specialty: 'Cardiologia',
    working_days: [1, 3, 5], // Segundas, quartas, sextas
  },
  {
    name: 'Dra. Maria Souza',
    sex: Sex.FEMALE,
    crm: '654321-RJ',
    phone: '5511999990002',
    email: 'maria.souza@hospital.com',
    birth_date: new Date('1980-12-20'),
    specialty: 'Pediatria',
    working_days: [2, 4], // Terças e quintas
  },
  {
    name: 'Dr. Ricardo Alves',
    sex: Sex.MALE,
    crm: '789012-MG',
    phone: '5511999990003',
    email: 'ricardo.alves@hospital.com',
    birth_date: new Date('1982-09-15'),
    specialty: 'Ortopedia',
    working_days: [1, 2, 5], // Segundas, terças e sextas
  },
  {
    name: 'Dra. Fernanda Oliveira',
    sex: Sex.FEMALE,
    crm: '321654-BA',
    phone: '5511999990004',
    email: 'fernanda.oliveira@hospital.com',
    birth_date: new Date('1990-05-18'),
    specialty: 'Dermatologia',
    working_days: [3, 5], // Quartas e sextas
  },
  {
    name: 'Dr. Lucas Lima',
    sex: Sex.MALE,
    crm: '987654-RS',
    phone: '5511999990005',
    email: 'lucas.lima@hospital.com',
    birth_date: new Date('1987-03-30'),
    specialty: 'Neurologia',
    working_days: [2, 4], // Terças e quintas
  },
];

async function seed() {
  await prisma.appointment.deleteMany();
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
