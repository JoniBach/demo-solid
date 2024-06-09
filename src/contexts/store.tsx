import {
  createContext,
  createSignal,
  useContext,
  ParentComponent,
} from "solid-js";

interface DataContextType {
  loading: () => boolean;
  data: () => {
    users?: any[];
    brands?: any[];
    products?: any[];
    reviews?: any[];
  };
  columns: () => {
    users?: any[];
    brands?: any[];
    products?: any[];
    reviews?: any[];
  };
  fetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType>();

export const DataProvider: ParentComponent = (props) => {
  const [loading, setLoading] = createSignal<boolean>(true);
  const [data, setData] = createSignal<Record<string, any[]>>({});
  const [columns, setColumns] = createSignal<Record<string, any[]>>({});

  const fetchData = async () => {
    try {
      const usersRes = await fetch("/data/users.json");
      const brandsRes = await fetch("/data/brands.json");
      const productsRes = await fetch("/data/products.json");
      const reviewsRes = await fetch("/data/reviews.json");
      const columnsRes = await fetch("/data/columns.json");

      if (
        !usersRes.ok ||
        !brandsRes.ok ||
        !productsRes.ok ||
        !reviewsRes.ok ||
        !columnsRes.ok
      ) {
        throw new Error("Failed to fetch data");
      }

      const users = await usersRes.json();
      const brands = await brandsRes.json();
      const products = await productsRes.json();
      const reviews = await reviewsRes.json();
      const columnsData = await columnsRes.json();

      setData({ users, brands, products, reviews });
      setColumns(columnsData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider value={{ loading, data, columns, fetchData }}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
