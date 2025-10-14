interface Window {
  electron: {
    subscribeStatistics: (callback: (stats) => void) => void;
    getStaticData: () => unknown;
  };
}
