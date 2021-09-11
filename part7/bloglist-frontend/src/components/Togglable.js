import React, { useState, useImperativeHandle } from "react";
import { Box, Button } from "@chakra-ui/react";

import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <Box
      rounded={3}
      border={visible ? "1px solid grey" : ""}
      p={visible ? 4 : 0}
    >
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={toggleVisibility} colorScheme="red">
          cancel
        </Button>
      </div>
    </Box>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

// required by es-lint because fwdRef creates an anonymous fn
Togglable.displayName = "Togglable";

export default Togglable;
