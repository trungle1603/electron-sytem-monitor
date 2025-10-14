import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { CONFIG } from "./config.js";
import { getPreloadPath } from "./pathResolver.js";
import { pollResources } from "./resourceManager.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      // contextIsolation: true,
      preload: getPreloadPath(),
    },
  });

  if (CONFIG.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "dist-ui/index.html"));
  }

  pollResources(mainWindow);

  ipcMain.handle("getStaticData", (event) => {
    return {};
  });
});
