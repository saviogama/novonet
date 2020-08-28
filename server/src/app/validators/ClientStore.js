import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      code: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
