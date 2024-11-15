"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMessages from "../../contexts/message.context";
import { UserType } from "../../types/user.types";
import Link from "next/link";

type MessagePostFormProps = {
  parentId?: string;
  currentUser?: UserType;
};

type FormData = {
  message: string;
};

const MessagePostForm = ({ parentId, currentUser }: MessagePostFormProps) => {
  const router = useRouter();
  const { postMessage } = useMessages();
  const { register, handleSubmit, resetField, setFocus } = useForm<FormData>();

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  const onSubmit = async (data: FormData) => {
    await postMessage(data.message, parentId);
    resetField("message");
    setFocus("message");
  };

  const goToLogin = () => {
    router.push("/login");
    router.refresh();
  };

  if (!currentUser) {
    return (
      <div className="mb-4 flex flex-col items-center">
        <h3>Inicia tu sesión para escribir un mensaje</h3>
        <button
          onClick={() => goToLogin()}
          className="button-primary w-fit mt-4"
          type="submit"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 grid grid-cols-12">
      <div className="w-full h-full rounded-full text-center mb-4 col-span-2 flex items-center justify-center">
      <Link href={`/users/${currentUser.username}`}>
        <Image
          priority
          width={80}
          height={80}
          className="rounded-full cursor-pointer"
          src={currentUser.photoUrl}
          alt={""}
        />
      </Link>
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
