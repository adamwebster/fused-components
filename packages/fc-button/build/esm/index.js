import React from 'react';

var Button = React.forwardRef(function (_a, ref) {
    var children = _a.children;
    return (React.createElement("button", { ref: ref }, children));
});

export { Button };
