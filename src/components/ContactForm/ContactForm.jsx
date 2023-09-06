import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash, and spaces.'
    )
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  number: Yup.string()
    .matches(
      /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/,
      'Ukraine phone number format: +38 (0XX) XXX-XX-XX'
    )
    .required('Required'),
});

const ContactForm = ({ onAdd }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const isSuccess = onAdd({ id: nanoid(), ...values });
    if (!isSuccess) return;
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className={s.phonebook}>
      <h2>Phonebook 📞</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? s.errorInput : ''}
              />
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>

            <div>
              <InputMask
                mask="+38 (099) 999-99-99"
                type="tel"
                name="number"
                id="number"
                placeholder="Enter Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.number}
                className={touched.number && errors.number ? s.errorInput : ''}
              />
              <ErrorMessage name="number" component="div" className={s.error} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ContactForm;
