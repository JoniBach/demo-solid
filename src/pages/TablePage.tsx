import { Table } from "../components/Table";
import { onMount } from "solid-js";
import { Component, For } from "solid-js";
import { useData } from "../contexts/store";

export const TablePage: Component = () => {
  const { loading, data, columns, fetchData } = useData();

  onMount(async () => {
    await fetchData();
  });

  return (
    <div>
      {loading() ? (
        <p>Loading...</p>
      ) : (
        <>
          <For each={columns()}>
            {(column) => (
              <div>
                <h1>{column.id} Table</h1>
                <Table data={data()[column.id]} columns={column.data} />
              </div>
            )}
          </For>
        </>
      )}
    </div>
  );
};
