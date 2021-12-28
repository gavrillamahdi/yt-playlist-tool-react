export const useMakeUrl = (base, properties) => {
  let url = `${base}`;

  for (const [key, val] of Object.entries(properties)) {
    if (!val) {
      continue;
    }

    url += `&${key}=${val}`;
  }
  return url;
};
