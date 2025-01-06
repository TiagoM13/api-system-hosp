import { PrismaDoctorRepository } from '@modules/doctors/infra/prisma/prisma-doctor-repository';
import { DoctorRepository } from '@modules/doctors/repositories/doctor-repository';

export const makePrismaDoctorRepoistory = (): DoctorRepository => {
  return new PrismaDoctorRepository();
};
