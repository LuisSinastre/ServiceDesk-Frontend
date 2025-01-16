import React from "react";

interface FormDetailsProps {
    form: Record<string, any>;
}

const FormDetails: React.FC<FormDetailsProps> = ({ form }) => {
    if (!form || Object.keys(form).length === 0) {
        return <p>Formulário não disponível.</p>;
    }

    return (
        <ul>
            {Object.entries(form).map(([key, value]) => (
                <span key={key}>
                    <strong>{key}:</strong> {value}
                    <br />
                </span>
            ))}
        </ul>
    );
};

export default FormDetails;
