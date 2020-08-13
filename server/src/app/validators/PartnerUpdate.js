import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      company_name: Yup.string(),
      rg: Yup.string(),
      cpf: Yup.string(),
      cnpj: Yup.string(),
      old_password: Yup.string().min(6),
      password_entry: Yup.string().min(6).when('old_password', (old_password, field) =>
        old_password ? field.required() : field
      ),
      confirm_password: Yup.string().when('password_entry', (password_entry, field) =>
        password_entry ? field.required().oneOf([Yup.ref('password_entry')]) : field
      ),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();

  } catch (err) {
    return response.status(400).json({ error: 'Validation fails', messages: err.inner });
  }
}
