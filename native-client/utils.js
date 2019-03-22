export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  return [month, day, year].join('/');
}

export function getApiUrl(releaseChannel) {
  if (releaseChannel === undefined) return App.apiUrl.dev; // since releaseChannels are undefined in dev, return your default.
  if (releaseChannel.indexOf('prod') !== -1) return App.apiUrl.prod; // this would pick up prod-v1, prod-v2, prod-v3
  if (releaseChannel.indexOf('staging') !== -1) return App.apiUrl.staging; // return staging environment variables
}
