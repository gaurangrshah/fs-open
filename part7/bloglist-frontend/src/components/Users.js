import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { List, ListItem, Link } from "@chakra-ui/react";

const Users = ({ users }) => {
  return users?.map((user) => (
    <List as="ul" key={user.id} p={6}>
      <ListItem border="1px" rounded={5} p={3} my={6}>
        <Link as={ReactLink} to={`/users/${user.id}`} mr={2}>
          {user.name}
        </Link>
        <span>has {user?.posts?.length} posts</span>
      </ListItem>
    </List>
  ));
};

export default Users;
