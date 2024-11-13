"use client";
import Button from "@/components/presentational/Button";
import Input from "@/components/presentational/Input";

export const QuizFrom = ({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => Promise<void>;
}) => (
  <form
    action={onSubmit}
    className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
  >
    <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Quiz</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input type="text" name="id" label="Quiz Id" className="col-span-2" />
      <Input type="text" name="name" label="Quiz Name" />
      <Input type="text" name="description" label="Quiz Description" />
      <Input type="text" name="category" label="Quiz Category" />
    </div>

    <div className="flex justify-end mt-4">
      <Button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        <span className="font-bold">Submit</span>
      </Button>
    </div>
  </form>
);
