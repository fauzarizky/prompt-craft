import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, params, handleEdit, handleDelete, handleTabChange, isActive, handleLikePrompt, handleUnLikePrompt }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="flex mt-10 gap-3">
        <p className={`font-satoshi text-gray-600 hover:underline cursor-pointer ${isActive === 1 ? "underline" : ""}`} onClick={() => handleTabChange(1)}>
          Posts
        </p>
        <p className={`font-satoshi text-gray-600 hover:underline cursor-pointer ${isActive === 2 ? "underline" : ""}`} onClick={() => handleTabChange(2)}>
          Likes
        </p>
      </div>
      <div className="prompt_layout">
        {data?.map((post) => (
          <PromptCard key={post._id} post={post} params={params} handleEdit={() => handleEdit && handleEdit(post)} handleDelete={() => handleDelete && handleDelete(post)} handleLikePrompt={handleLikePrompt} handleUnLikePrompt={handleUnLikePrompt} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
