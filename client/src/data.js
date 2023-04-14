class Data {
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
  }
}

let data = null;

export function CL(fullName) {
  if (data === null) {
    data = new Data(fullName);
  }
  return data;
}
