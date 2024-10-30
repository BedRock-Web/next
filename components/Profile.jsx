import React from "react";
import PromptCard from "@components/PromptCard";
const Profile = ({ data, name, des, handelEdit, handelDel }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{des}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post, index) => (
          <PromptCard
            key={index}
            handelEdit={() => handelEdit && handelEdit(post)}
            handelDel={() => handelDel && handelDel(post)}
            post={post}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
