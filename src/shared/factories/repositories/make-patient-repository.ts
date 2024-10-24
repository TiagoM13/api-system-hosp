import { PatientRepository } from '@shared/repositories/implementations';
import { IPatientRepository } from '@shared/repositories/interfaces/patient';

export const makePatientRepository = (): IPatientRepository => {
  return new PatientRepository();
};
