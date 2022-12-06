const customStorage = {
  getItem: (key, defaultValue, onError) => {
    try {
      const existValue = localStorage.getItem(key);
      if (existValue) {
        return JSON.parse(existValue);
      }

      return defaultValue;
    } catch (err) {
      if (onError) {
        onError(err);
      }
      return defaultValue;
    }
  },
  setItem: (key, newValue, onError) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      if (onError) {
        onError(err);
      }
      console.error(err);
    }
  },
};

export default customStorage;
