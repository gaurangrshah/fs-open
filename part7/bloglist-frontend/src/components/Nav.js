import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Flex, Link, List, ListItem } from "@chakra-ui/react";

const Nav = ({ children }) => {
  const menu = ["blogs", "users"];
  return (
    <Flex as="nav" justify="space-between" w="full">
      <List as="ul" display="flex" align="center" listStyleType="none">
        {menu.map((item) => (
          <ListItem key={item} mx={3}>
            <Link as={ReactLink} to={`/${item}`} textTransform="capitalize" fontWeight="600">
              {item}
            </Link>
          </ListItem>
        ))}
      </List>
      <Box>{children}</Box>
    </Flex>
  );
};

export default Nav;
