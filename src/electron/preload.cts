import electron from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callBack) => {
    electron.ipcRenderer.on("statistics", (event, data) => {
      callBack(data);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
} satisfies Window["electron"]);
