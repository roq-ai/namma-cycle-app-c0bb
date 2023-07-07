import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCycle } from 'apiSdk/cycles';
import { Error } from 'components/error';
import { cycleValidationSchema } from 'validationSchema/cycles';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { StationInterface } from 'interfaces/station';
import { getStations } from 'apiSdk/stations';
import { CycleInterface } from 'interfaces/cycle';

function CycleCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CycleInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCycle(values);
      resetForm();
      router.push('/cycles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CycleInterface>({
    initialValues: {
      status: '',
      station_id: (router.query.station_id as string) ?? null,
    },
    validationSchema: cycleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Cycle
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<StationInterface>
            formik={formik}
            name={'station_id'}
            label={'Select Station'}
            placeholder={'Select Station'}
            fetcher={getStations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.location}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'cycle',
    operation: AccessOperationEnum.CREATE,
  }),
)(CycleCreatePage);
