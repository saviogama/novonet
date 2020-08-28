import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().min(10),
      firstname: Yup.string().min(5),
      lastname: Yup.string().min(5),
      rg: Yup.string().min(8),
      cpf: Yup.string().min(11),
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
