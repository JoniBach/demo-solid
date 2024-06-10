import { onMount, Component } from "solid-js";
import { useData } from "../contexts/store";
import { Form } from "../components/Form";

export const FormPage: Component = () => {
  const { loading, data, forms, fetchData } = useData();

  onMount(async () => {
    await fetchData();
  });

  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log("Submitted data:", formData);
  };

  return (
    <div>
      {loading() ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Users Form</h1>
          <Form
            fields={forms().users}
            data={data().users[0]}
            onSubmit={handleSubmit}
          />

          <h1>Brands Form</h1>
          <Form
            fields={forms().brands}
            data={data().brands[0]}
            onSubmit={handleSubmit}
          />

          <h1>Products Form</h1>
          <Form
            fields={forms().products}
            data={data().products[0]}
            onSubmit={handleSubmit}
          />

          <h1>Reviews Form</h1>
          <Form
            fields={forms().reviews}
            data={data().reviews[0]}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};
