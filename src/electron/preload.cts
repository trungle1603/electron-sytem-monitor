// import electron from "electron";
const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callBack: (statistic: Record<string, never>) => void) =>
    callBack({}),
  getStaticData: () => console.log("getStaticData"),
});
