"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import messageApi from "../../service/messages/messages.services";

type MessagePostFormProps = {
  parentId?: string;
}

type FormData = {
  message: string;
};

const MessagePostForm = ({ parentId }: MessagePostFormProps) => {
  const { register, handleSubmit, resetField, setFocus } = useForm<FormData>();

  useEffect(() => {
    setFocus("message");
  }, []);

  const onSubmit = async (data: FormData) => {
    const response = await messageApi.postMessage(data.message, parentId);
    console.log(response);
    resetField("message");
    setFocus("message");
  };

  return (
    <div className="mb-4 grid grid-cols-12">
      <div className="w-full h-full rounded-full text-center mb-4 col-span-2 flex items-center justify-center">
        <Image
          priority
          width={80}
          height={80}
          className="rounded-full cursor-pointer"
          src={
            "https://i.pinimg.com/564x/1b/2d/c0/1b2dc0ce77080e4a682fbbfd2eb3b0c1.jpg"
          }
          alt={""}
        />
      </div>
      <div className="flex flex-col ml-4 mt-2 col-span-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            rows={4}
            placeholder="¿En qué estás pensando?"
            className="resize-none p-2 w-full mb-4 rounded bg-gray-50 border border-gray-200"
            {...register("message", { required: true })}
          />
          <div className="flex justify-end">
            <button type="submit" className="button-primary w-fit">
              Postear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagePostForm;
