'use client';
import { createPlan, uploadImage } from '@/lib/server/fetchCoaches';
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserContext } from '@/context/user';
import { IPlan } from '@/interfaces/interfaces';
import { planValidationSchema } from '@/utils/planValidationSchema';


export default function TrainingManagement() {
  const {user} = useContext(UserContext)
  const initialValues = {
    description: '',
    file: null,
  };

  const onSubmit = async (values: IPlan) => {
    console.log(values);

    if (values.file && values.description && user?.id) {
      await createPlan(values.description);
      await uploadImage(user?.id, values.file);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={planValidationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="description">Descripción</label>
            <Field
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
            />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="file">Archivo</label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(event) => {
                const files = event.currentTarget.files;
                if (files && files.length > 0) {
                  setFieldValue("file", files[0]); // Guardar el archivo en Formik
                }
              }}
            />
            <ErrorMessage name="file" component="div" />
          </div>
          <button type="submit">Crear plan</button>
        </Form>
      )}
    </Formik>
  );
}
