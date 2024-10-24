import { DoctorRepository } from '@shared/repositories/implementations';
import { IDoctorRepository } from '@shared/repositories/interfaces/doctor';

export const makeDoctorRepoistory = (): IDoctorRepository => {
  return new DoctorRepository();
};
