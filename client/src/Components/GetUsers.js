import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

import { JL } from "jsnlog";

JL.setOptions({
  defaultAjaxUrl: "http://localhost:6969/logger",
});

const logOptions = { appName: "Market", sid: "D123456", appVersion: "1" };

var logger = JL(JSON.stringify(logOptions));

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS, {
    onError: (error) => {
      // const networkErrorMsg = error.networkError.result.errors[0].message;
      const networkErrorMsg = error.networkError.result.errors.map(
        (x) => x.message
      );
      logger.info(`Something went wrong: ${networkErrorMsg}`);
      // console.log(error.networkError.result.errors);
      console.log(networkErrorMsg);
      console.log({ error });
    },
  });

  const stuff = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  // console.log(error, loading, data);
  // console.log({ error }, stuff);
  // console.log({ error });
  // console.log(stuff);

  useEffect(() => {
    if (data) {
      // console.log(error, loading, data.getAllUsers);
      setUsers(data.getAllUsers);
    }
  }, [error, data]);

  return (
    <div>
      {" "}
      {users.map((val) => {
        return <h1> {val.firstName}</h1>;
      })}
    </div>
  );
}

export default GetUsers;
