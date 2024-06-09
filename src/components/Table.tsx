import { Component, onCleanup, onMount } from "solid-js";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

interface TableProps {
  data: any[];
  columns: any[];
}

export const Table: Component<TableProps> = (props) => {
  let tableRef: HTMLDivElement | undefined;

  onMount(() => {
    if (tableRef) {
      const tabulator = new Tabulator(tableRef, {
        data: props.data,
        reactiveData: true,
        columns: props.columns,
      });

      // Cleanup function to destroy Tabulator instance on component unmount
      onCleanup(() => {
        tabulator.destroy();
      });
    }
  });

  return <div ref={tableRef}></div>;
};
