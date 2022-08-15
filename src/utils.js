function transformGeolocationData(data){
  if(data?.messages) return data;

  return [
    [data.location.lat, data.location.lng],
    ["ip address", data.ip],
    ["location", `${data.location.city && `${data.location.city},`} ${data.location.region} ${data.location.postalCode}`],
    ["timezone", `${data.location.timezone && `UTC ${data.location.timezone}`}`],
    ["isp", data.isp]
  ];
}


export function validateIPAddress(value){
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
}

export function validateDomainName(value){
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value);
}

export async function fetchData({ipAddress = "", domain = ""}){
  let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEOLOCATION_API_KEY}`;
  if(ipAddress) url += `&ipAddress=${ipAddress}`;
  if(domain) url += `&domain=${domain}`;
  const res = await fetch(url);
  const data = await res.json();
  return transformGeolocationData(data);
}