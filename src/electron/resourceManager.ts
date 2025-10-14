import { BrowserWindow } from "electron";
import { EVENTS } from "./constant.js";
import {
  getMemoryUsage,
  getProcessCpuUsage,
  getSystemCpuUsage,
} from "./system.util.js";

const POLLING_INTERVAL = 1000;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const [procCpu, sysCpu] = await Promise.all([
      getProcessCpuUsage(POLLING_INTERVAL),
      getSystemCpuUsage(POLLING_INTERVAL),
    ]);
    const mem = getMemoryUsage();

    const result = {
      processUsage: procCpu.toFixed(2),
      systemUsage: sysCpu.toFixed(2),
      memUsage: mem.usedMB,
    };

    mainWindow.webContents.send(EVENTS.STATISTIC, result);
  }, POLLING_INTERVAL);
}
