import * as yup from 'yup';

export const cycleValidationSchema = yup.object().shape({
  status: yup.string().required(),
  station_id: yup.string().nullable(),
});
