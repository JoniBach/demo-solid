import { Table } from "../components/Table";
import { onMount } from "solid-js";
import { Component } from "solid-js";
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
          <h1>Users Table</h1>
          <Table data={data().users} columns={columns().users} />

          <h1>Brands Table</h1>
          <Table data={data().brands} columns={columns().brands} />

          <h1>Products Table</h1>
          <Table data={data().products} columns={columns().products} />

          <h1>Reviews Table</h1>
          <Table data={data().reviews} columns={columns().reviews} />
        </>
      )}
    </div>
  );
};
