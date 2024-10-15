import { PatientRepository } from '@shared/repositories/implementations';

export const makePatientRepository = () => {
  return new PatientRepository();
};
