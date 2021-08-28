import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "this guy",
    url: "https://www.url.com",
  };
  const mockLikeHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  const { getByText } = render(
    <Blog
      blog={blog}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
    />
  );
  const title = getByText(
    /component testing is done with react-testing-library/i
  );
  const author = getByText(/this guy/i);
  const url = getByText(/www.url.com/i);
  const likes = getByText(/likes/i);
  expect(title).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(likes).not.toBeVisible();
  expect(url).not.toBeVisible();

  const likeButton = getByText(/add like/i);
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockLikeHandler.mock.calls).toHaveLength(2);

  const showButton = getByText(/view/i);
  await waitFor(() => fireEvent.click(showButton));
  expect(likes).toBeVisible();
  expect(url).toBeVisible();
});
