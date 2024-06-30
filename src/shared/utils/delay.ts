const SECOND_IN_MS = 1000;

export default (senconds: number) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(null), senconds * SECOND_IN_MS)
  );
