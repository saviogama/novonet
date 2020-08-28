import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string().min(1),
      company_name: Yup.string(1),
      rg: Yup.string().min(1),
      cpf: Yup.string().min(1),
      cnpj: Yup.string().min(1),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
