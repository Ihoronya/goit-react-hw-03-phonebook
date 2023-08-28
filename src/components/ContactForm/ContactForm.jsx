import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';

const ContactForm = ({ onAdd, checkUniqueName }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const onSubmit = (values, { resetForm }) => {
    const isFormValid = validForm(values);

    if (!isFormValid) return;

    onAdd({ id: nanoid(), ...values });
    resetForm();
  };

  const validForm = ({ name, number }) => {
    if (!name || !number) {
      alert('Name and Number are required');
      return false;
    }
    return checkUniqueName(name);
  };

  return (
    <div className={s.phonebook}>
      <h2>Phonebook 📞</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
            <Field
              type="text"
              name="name"
              placeholder="Enter Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage name="name" component="div" className={s.error} />
            <Field
              as={InputMask}
              type="tel"
              name="number"
              placeholder="Enter Phone Number"
              mask="+38 (099) 999-99-99"
              pattern="^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
              title="Ukraine phone number format: +38 (0XX) XXX-XX-XX"
              required
            />
            <ErrorMessage name="number" component="div" className={s.error} />
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
  checkUniqueName: PropTypes.func.isRequired,
};

export default ContactForm;