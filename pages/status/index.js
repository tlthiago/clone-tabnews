import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div>
      <h1>Status</h1>
      <ApiStatusInformation />
    </div>
  );
}

function ApiStatusInformation() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let apiStatusInformation = "Carregando...";

  if (!isLoading && data) {
    apiStatusInformation = (
      <div>
        <p>
          Última atualização:{" "}
          {new Date(data.updated_at).toLocaleString("pt-br")}
        </p>
        <h1>Database</h1>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>
          Quantidade de conexões abertas:{" "}
          {data.dependencies.database.max_connections}
        </p>
        <p>
          Quantidade máxima de conexões:{" "}
          {data.dependencies.database.opened_connections}
        </p>
      </div>
    );
  }

  return apiStatusInformation;
}
