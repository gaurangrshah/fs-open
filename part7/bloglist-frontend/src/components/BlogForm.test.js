import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const handleCreate = jest.fn();

  const component = render(<BlogForm handleCreate={handleCreate} />);

  const input = component.container.querySelector("input");
  const form = component.container.querySelector("form");
  fireEvent.change(input, {
    target: { value: "testing of forms could be easier" },
  });
  await waitFor(() => fireEvent.submit(form));

  expect(handleCreate.mock.calls).toHaveLength(1);
  expect(handleCreate.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  );
});
