import { onMount, Component, For } from "solid-js";
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
          <For each={forms()}>
            {(form) => (
              <div key={form.id}>
                <h1>
                  {form.id.charAt(0).toUpperCase() + form.id.slice(1)} Form
                </h1>
                <Form
                  fields={form.data}
                  data={data()?.[form.id]?.[0]}
                  onSubmit={handleSubmit}
                />
              </div>
            )}
          </For>
        </>
      )}
    </div>
  );
};
