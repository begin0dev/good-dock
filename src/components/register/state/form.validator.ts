import * as yup from "yup";

export const formValidatorSchema = yup.object({
  type: yup.mixed().oneOf(["subscribe", "fixed"]).required(),
  ko: yup.string().required(),
  imageUrl: yup.string().optional(),
  price: yup.number().min(0).required(),
  startDate: yup.date().required(),
  period: yup.number().required(),
  unit: yup.mixed().oneOf(["week", "month", "year"]).required(),
  memo: yup.string().nullable(),
});
