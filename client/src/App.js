import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetUsers from "./Components/GetUsers";
import Form from "./Components/Form";
import { JL } from "jsnlog";
import { CL } from "./data";

const logOptions = { appName: "Market", sid: "D123456", appVersion: "1" };

JL.setOptions({
  defaultAjaxUrl: "http://localhost:6969/logger",
  requestId: JSON.stringify(logOptions),
});

var logger = JL(JSON.stringify(logOptions));

const cLogger = CL("App.js");
cLogger.setOptions({ appName: "market", SID: "D456456" });

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const handleOnClick = () => {
  cLogger.info("handleClick");
  logger.info("message from the client");
};

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <button onClick={handleOnClick}>test</button>
      <Form />
      <GetUsers />
    </ApolloProvider>
  );
}

export default App;
