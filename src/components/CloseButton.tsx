import React, { memo, ReactElement } from "react";

interface ICloseButton {
  [key: string]: any;
}

const CloseButton = (props: ICloseButton): ReactElement => (
  <button {...props}>close</button>
);

export default memo(CloseButton);
