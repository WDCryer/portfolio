import React, { memo } from "react";

const Loader = props => <progress {...props} />;

export default memo(Loader);
