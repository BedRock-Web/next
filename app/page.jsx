import Feed from "@components/Feed";
import React from "react";

const page = () => {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Jani na
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">ki jani!</span>
      </h1>
      <p className="text-center desc">
        jani Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dol
      </p>

      <Feed />
    </section>
  );
};
export default page;
