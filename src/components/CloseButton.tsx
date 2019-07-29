import React, { memo, ReactElement } from "react";

const CloseButton = (props: object): ReactElement => (
  <button {...props}>close</button>
);

export default memo(CloseButton);