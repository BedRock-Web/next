"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
const PromptCard = ({ post, handelTagClick, handelEdit, handelDel }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const handelCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="prompt_card font-inter">
      <div className="items-start justify-between flex gap-5">
        <div className="cursor-pointer gap-3 items-center flex justify-start w-1/6">
          <Image
            src={post.creator.image}
            className="rounded-full object-contain"
            alt="image"
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col   w-4/6 ">
          <h3 className="text-gray-900 font-semibold">
            {post.creator.userName}
          </h3>
          <p className="text-sm text-gray-500">{post.creator.email}</p>
        </div>
        <div className="copy_btn" onClick={handelCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="image"
          />
        </div>
      </div>
      <p className="text-gray-700 my-4 text-sm">{post.prompt}</p>
      <p
        className="cursor-pointer text-sm blue_gradient"
        onClick={() => handelTagClick && handelTagClick(post.tags)}
      >
        {post.tags}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 font-inter">
          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={handelEdit}
          >
            Edit
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={handelDel}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
