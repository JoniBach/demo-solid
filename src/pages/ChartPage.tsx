import { createEffect, onMount } from "solid-js";
import { Chart } from "../components/Chart";
import { useData } from "../contexts/store";

export const ChartPage = () => {
  const { loading, data, columns, charts, fetchData } = useData();

  onMount(() => {
    fetchData().then(() => {});
  });

  return (
    <>
      <h1>Chart Page</h1>
      {loading() ? (
        <p>Loading...</p>
      ) : data()?.reviews?.length && charts() ? (
        <Chart data={data().reviews} config={charts()} />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default ChartPage;
