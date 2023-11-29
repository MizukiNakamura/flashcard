"use client";

import { useState, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { editQA } from "@/utils/server-actions/edit-qa";
import Button from "../elements/Button";
import ControlledTextArea from "../elements/ControlledTextArea";
import ValidationMessage from "../elements/ValidationMessage";

type FormValues = { flashcardId: number; qaId: number; question: string; answer: string };

type Props = { flashcardId: number; qaId: number; question: string; answer: string };

const EditQAndAForm: FC<Props> = ({ flashcardId, qaId, question, answer }) => {
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { flashcardId, qaId, question, answer } });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setSubmissionResult(null);
    const response = await editQA(formData);
    setSubmissionResult(response);
  };

  return (
    <form
      // @ts-expect-error actionの不要なタイプエラー
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      action={handleSubmit(onSubmit)}
    >
      <div>
        <ControlledTextArea<FormValues>
          placeholder="問題文"
          name="question"
          hasDefaultValue={true}
          control={control}
          rules={{
            required: "記入してください",
            maxLength: { value: 200, message: "200文字以内で記入してください" },
          }}
        />
        <ValidationMessage type="error" text={errors.question?.message} />
      </div>

      <div className="mt-[32px]">
        <ControlledTextArea<FormValues>
          placeholder="解答文"
          name="answer"
          hasDefaultValue={true}
          control={control}
          rules={{
            required: "記入してください",
            maxLength: { value: 400, message: "400文字以内で記入してください" },
          }}
        />
        <ValidationMessage type="error" text={errors.answer?.message} />
      </div>

      <input {...register("flashcardId")} type="hidden" />
      <input {...register("qaId")} type="hidden" />

      <div className="mt-[32px] text-center">
        <Button type="submit" disabled={isSubmitting} text={isSubmitting ? "送信中" : "送信"} />
        {submissionResult && (
          <ValidationMessage
            type={submissionResult.success ? "success" : "error"}
            text={submissionResult.message}
          />
        )}
      </div>
    </form>
  );
};

export default EditQAndAForm;
