import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      code: Yup.string().uuid().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
