import React, { useState } from 'react';

const Button = (link) => {
    const [copiedText, setCopiedText] = useState("Copy");

    const handleCopy = () => {
        setCopiedText("Copied");
        document.execCommand("copy");
        setCopiedText("Copy");
    };

    return (
        <button
            className="btn btn-secondary mt-1 mt-lg-0"
            onClick={() => handleCopy()}
            >
            <i className="bi bi-clipboard"></i>
            {copiedText}
        </button>
    );
};

export default Button;