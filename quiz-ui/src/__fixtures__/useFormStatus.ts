import {
  FormStatus,
  FormStatusNotPending,
  FormStatusPending,
  useFormStatus,
} from "react-dom";
import { mockOf } from "./mockOf";

export const mockUseFormStatus = (
  overrides: Pick<FormStatus, "pending"> = { pending: false }
) => {
  if (overrides.pending) {
    const data: FormStatusPending = {
      pending: true,
      data: {} as FormData,
      method: "",
      action: "",
    };
    mockOf(useFormStatus).mockReturnValue(data);
    return data;
  } else {
    const data: FormStatusNotPending = {
      data: null,
      method: null,
      action: null,
      pending: false,
    };
    mockOf(useFormStatus).mockReturnValue(data);
    return data;
  }
};
