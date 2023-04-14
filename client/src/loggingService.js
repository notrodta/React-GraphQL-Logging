class LoggingService {
  constructor(name) {
    this.name = name;
    this.loggerEndpoint = null;
    this.appName = null;
    this.SID = null;
  }

  setOptions(data) {
    this.loggerEndpoint = data.loggerEndpoint;
    this.appName = data.appName;
    this.SID = data.SID;
  }

  info(msg) {
    const options = JSON.stringify({ appName: this.appName, SID: this.SID });
    console.log(`${this.name}: {message: ${msg}}, requestId: ${options}`);
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((data) => console.log(data.results[0].name.first))
      .catch((error) => console.error(error));
  }
}

let loggingService = new LoggingService();

export function CL(fullName) {
  loggingService.name = fullName;
  return loggingService;
}

export function initialize(data) {
  loggingService.setOptions(data);
}
