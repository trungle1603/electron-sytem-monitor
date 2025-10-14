import { app } from "electron";
import path from "path";
import { CONFIG } from "./config.js";

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    CONFIG.NODE_ENV === "development" ? "." : "..",
    "/dist-electron/preload.cjs"
  );
}
