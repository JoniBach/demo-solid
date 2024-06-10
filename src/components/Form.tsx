import { createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

interface Field {
  title: string;
  field: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  validation?: string;
  min?: number;
  max?: number;
  options?: number[];
}

interface FormProps {
  fields: Field[];
  data: { [key: string]: any };
  onSubmit: (data: { [key: string]: any }) => void;
}

export const Form: Solid.FC<FormProps> = (props: any) => {
  const [tempValues, setTempValues] = createStore<{ [key: string]: any }>({});

  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };

  const handleInputChange = (field: Field, event: Event) => {
    const input = event.target as HTMLInputElement;
    setTempValues(field.field, input.value);
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      setNestedValue(dataObj, key, value);
    });
    props.onSubmit(dataObj);
  };

  return (
    <form onSubmit={handleSubmit}>
      <For each={props.fields}>
        {(field, index) => (
          <div>
            <Show when={field.type === "radio"}>
              <div>
                <label>{field.title}</label>
                <For each={field.options}>
                  {(option) => (
                    <div>
                      <input
                        type="radio"
                        name={field.field}
                        value={option}
                        required={field.required}
                        checked={
                          getNestedValue(props.data, field.field) == option
                        }
                      />
                      <label>{option}</label>
                    </div>
                  )}
                </For>
              </div>
            </Show>
            <Show when={field.type === "textarea"}>
              <div>
                <label>{field.title}</label>
                <textarea
                  name={field.field}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={getNestedValue(props.data, field.field)}
                  onInput={(e) => handleInputChange(field, e)}
                ></textarea>
              </div>
            </Show>
            <Show when={field.type !== "radio" && field.type !== "textarea"}>
              <div>
                <label>{field.title}</label>
                <input
                  type={field.type}
                  name={field.field}
                  placeholder={field.placeholder}
                  required={field.required}
                  pattern={field.validation || undefined}
                  min={field.min || undefined}
                  max={field.max || undefined}
                  value={getNestedValue(props.data, field.field)}
                  onInput={(e) => handleInputChange(field, e)}
                />
              </div>
            </Show>
          </div>
        )}
      </For>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
