import * as yup from 'yup';

export const stationValidationSchema = yup.object().shape({
  location: yup.string().required(),
  company_id: yup.string().nullable(),
});
