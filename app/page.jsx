import Feed from "@components/Feed";

export default function Page() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">Prompt Craft is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>

      <Feed />
    </section>
  );
}
