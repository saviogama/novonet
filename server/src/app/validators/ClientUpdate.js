import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      firstname: Yup.string().min(1),
      lastname: Yup.string().min(1),
      rg: Yup.string().min(1),
      cpf: Yup.string().min(1),
      code: Yup.string(1),
      status: Yup.boolean(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
