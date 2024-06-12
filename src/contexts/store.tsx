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
  forms: () => {
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
  const [forms, setForms] = createSignal<Record<string, any[]>>({});

  // Function to fetch JSON data from a given URL
  const fetchJsonData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}: ${response.statusText}`
      );
    }
    return await response.json();
  };

  // Function to fetch all component data based on the configuration
  const fetchComponentData = async (components: any[], baseUrl: string) => {
    const componentPromises = components.map(async (component) => {
      const data = await fetchJsonData(baseUrl + component.data);
      return { id: component.id, data };
    });

    const componentsData = await Promise.all(componentPromises);

    return componentsData.reduce((acc, component) => {
      acc[component.id] = component.data;
      return acc;
    }, {});
  };

  // Function to fetch additional data (columns and forms)
  const fetchAdditionalData = async () => {
    const [columns, forms] = await Promise.all([
      fetchJsonData("/data/columns.json"),
      fetchJsonData("/data/forms.json"),
    ]);

    return { columns, forms };
  };

  const fetchData = async () => {
    try {
      // Fetch the configuration file
      const config = await fetchJsonData("/data/config.json");
      const baseUrl = "/data/";

      // Fetch component data and additional data concurrently
      const [componentData, additionalData] = await Promise.all([
        fetchComponentData(config.components, baseUrl),
        fetchAdditionalData(),
      ]);

      // Update the data signals with the fetched data
      setData(componentData);
      setColumns(additionalData.columns);
      setForms(additionalData.forms);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error.message);
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ loading, data, columns, forms, fetchData }}>
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
