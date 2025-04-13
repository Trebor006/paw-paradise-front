// src/pages/screens/Health/Health.jsx
export function Health() {
  const health = {
    status: "ok",
    frontend: "alive"
  };

  return <pre>{JSON.stringify(health, null, 2)}</pre>;
}
