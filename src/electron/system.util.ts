import os from "os";

/**
 * Get CPU usage percentage of the current Node.js process
 * (pure Node.js, no external dependencies)
 */
export async function getProcessCpuUsage(intervalMs = 1000): Promise<number> {
  const numCPUs = os.cpus().length;
  const startUsage = process.cpuUsage();
  const startTime = process.hrtime();

  return new Promise((resolve) => {
    setTimeout(() => {
      const elapsedHr = process.hrtime(startTime);
      const elapsedMs = elapsedHr[0] * 1000 + elapsedHr[1] / 1e6;

      const diffUsage = process.cpuUsage(startUsage);
      const diffUserMs = diffUsage.user / 1000;
      const diffSysMs = diffUsage.system / 1000;
      const totalProcessTime = diffUserMs + diffSysMs;

      // % = (process_time / elapsed_time / num_cores) * 100
      const cpuPercent = (100 * totalProcessTime) / (elapsedMs * numCPUs);
      resolve(cpuPercent);
    }, intervalMs);
  });
}

/**
 * Get system-wide CPU usage percentage (pure Node)
 */
export function getSystemCpuUsage(intervalMs = 1000): Promise<number> {
  function getCpuAverage() {
    const cpus = os.cpus();
    let totalIdle = 0,
      totalTick = 0;

    cpus.forEach((core) => {
      for (const type in core.times) totalTick += (core.times as never)[type];
      totalIdle += core.times.idle;
    });

    return {
      idle: totalIdle / cpus.length,
      total: totalTick / cpus.length,
    };
  }

  return new Promise((resolve) => {
    const start = getCpuAverage();

    setTimeout(() => {
      const end = getCpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const cpuPercent = 100 - (100 * idleDiff) / totalDiff;
      resolve(cpuPercent);
    }, intervalMs);
  });
}

/**
 * Get memory usage info (RAM)
 */
export function getMemoryUsage() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  const totalMB = total / 1024 / 1024;
  const usedMB = used / 1024 / 1024;
  const freeMB = free / 1024 / 1024;

  const percent = (used / total) * 100;

  return {
    totalMB: totalMB.toFixed(2),
    usedMB: usedMB.toFixed(2),
    freeMB: freeMB.toFixed(2),
    percent: percent.toFixed(2),
  };
}
