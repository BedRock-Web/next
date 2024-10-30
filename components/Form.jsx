import Link from "next/link";

const Form = ({ type, post, submit, setpost, handelsubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md  text-left desc">{type} korbo ta ki</p>
      <form
        onSubmit={handelsubmit}
        className="w-full max-w-2xl mt-10 flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-inter font-semibold text-base  text-gray-700">
            Kisu lakho
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            placeholder="kisu akta"
            className="form_textarea"
            required
          ></textarea>
        </label>
        <label>
          <span className="font-inter font-semibold text-base  text-gray-700">
            Tags
          </span>
          <input
            required
            placeholder="#tag"
            value={post.tags}
            className="form_input"
            onChange={(e) => setpost({ ...post, tags: e.target.value })}
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submit}
          >
            {submit ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
