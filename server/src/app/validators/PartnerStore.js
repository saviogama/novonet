import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      name: Yup.string().required(),
      company_name: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      cnpj: Yup.string().required(),
      password_entry: Yup.string().required().min(6),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();

  } catch (err) {
    return response.status(400).json({ error: 'Validation fails', messages: err.inner });
  }
}
