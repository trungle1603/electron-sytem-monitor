import {
  getMemoryUsage,
  getProcessCpuUsage,
  getSystemCpuUsage,
} from "./system.util.js";

const POLLING_INTERVAL = 1000;

export function pollResources() {
  setInterval(async () => {
    const [procCpu, sysCpu] = await Promise.all([
      getProcessCpuUsage(POLLING_INTERVAL),
      getSystemCpuUsage(POLLING_INTERVAL),
    ]);
    const mem = getMemoryUsage();

    console.log("=== System Stats ===");
    console.log(`Process CPU: ${procCpu.toFixed(2)}%`);
    console.log(`System CPU:  ${sysCpu.toFixed(2)}%`);
    console.log(`Memory: ${mem.usedMB}MB / ${mem.totalMB}MB (${mem.percent}%)`);
    console.log("====================\n");
  }, 3000);
}
