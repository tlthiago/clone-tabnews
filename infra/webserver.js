function getOrigin() {
  if (["test", "development"].includes(process.env.NODE_ENV)) {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCER_URL}`;
  }

  return "https://fintab.com.br";
}

const webserver = {
  origin: getOrigin(),
};

export default webserver;
