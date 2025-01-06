import { PrismaPatientRepository } from '@modules/patients/infra/prisma/prisma-patient-repository';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';

export const makePrismaPatientRepository = (): PatientRepository => {
  return new PrismaPatientRepository();
};
