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
      password_entry: Yup.string().min(6),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
