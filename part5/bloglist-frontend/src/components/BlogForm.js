import React from "react";

const BlogForm = ({
  onSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      Title:{" "}
      <input value={title} onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
      Author:{" "}
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      Url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default BlogForm;
