import { PatientRepository } from '@shared/repositories/implementations';

export const MakePatientRepository = () => {
  return new PatientRepository();
};
