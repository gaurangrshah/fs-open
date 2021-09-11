import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  // Button,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { remove, like } from "../reducers/blog-reducer";
import { setNotification } from "../reducers/notification-reducer";
import CommentForm from "./CommentForm";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const handleConfirmAndDelete = async (blog) => {
    if (!user) {
      dispatch(setNotification("You need to log in first", "error"));
      return;
    }

    try {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        dispatch(remove(blog));
      }
      dispatch(setNotification(`Deleted blog: ${blog.id}`, "success"));
    } catch (e) {
      console.error("🚀 | file: Blog.js | line 33 | e", e);
      dispatch(setNotification("Invalid blog", "error"));
    }
  };

  if (!blog) return null;

  return (
    <Box pt={2} pl={1} border="1px" mb={3} mx={9}>
      <Flex justify="space-between" p={4}>
        <Box>
          <Heading as="h2" lineHeight={1.3}>
            {blog.title}
          </Heading>
          <div>
            <Text className="likes-holder">
              <span>likes: </span>
              <span className="likes">{blog.likes}</span>
            </Text>
          </div>
          <div>{blog.url}</div>
        </Box>
        <Flex direction="column">
          <IconButton
            id="like-button"
            onClick={() => dispatch(like(blog))}
            mb={2}
            icon={<AddIcon />}
          />

          <IconButton
            id="remove-button"
            onClick={() => handleConfirmAndDelete(blog)}
            icon={<DeleteIcon />}
          >
            remove
          </IconButton>
        </Flex>
      </Flex>
      <Heading as="h3" fontSize="1xl" mt={6}>
        Comments
      </Heading>
      <hr />
      <Flex p={6} justify="space-between">
        <List as="ul">
          {blog.comments?.length ? (
            blog?.comments.map((comment, i) => (
              <ListItem key={i}>{comment}</ListItem>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </List>
        <CommentForm id={blog.id} />
      </Flex>
    </Box>
  );
};

function AddIcon() {
  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 100 125"
      x="0px"
      y="0px"
      w="1.25em"
      h="1.25em"
    >
      <path d="M99.83,40.19C99.16,47.82,96,54.46,91.7,60.62,84.15,71.39,75.14,80.7,64,87.81c-3.81,2.43-7.83,4.42-12.41,5-3.55.44-6.81-.59-10-2a61.68,61.68,0,0,1-15.12-10A103.1,103.1,0,0,1,6.33,57.6,38.29,38.29,0,0,1,0,36.91C0,28,2.52,20.06,9.11,13.82,16.87,6.47,27.9,5.08,37.72,9.94A33.34,33.34,0,0,1,49,19.14c0.25,0.32.51,0.62,0.77,0.93a0.81,0.81,0,0,0,.24.1c1.13-1.27,2.21-2.6,3.41-3.81A29.5,29.5,0,0,1,69.22,7.62,24.4,24.4,0,0,1,95,18.78C99.21,25.32,100.5,32.53,99.83,40.19Z" />
    </Box>
  );
}

export default Blog;
