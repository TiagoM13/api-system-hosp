import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';
import { IDoctorRepository } from '@shared/repositories/interfaces/doctor';

export const makeDoctorRepoistory = (): IDoctorRepository => {
  return new DoctorRepository();
};
