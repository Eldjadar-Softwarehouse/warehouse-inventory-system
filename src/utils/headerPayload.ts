import { HeadersPayload } from "@/models/auth";

const getIpAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    throw new Error("Unable to fetch IP address");
  }
};

// WILL CHANGE LOGIC LATER
const getSignature = () => {
  return "#";
};

export const getHeaders = async (): Promise<HeadersPayload> => {
  const ipAddress = await getIpAddress();
  const headers: HeadersPayload = {
    SIGNATURE: getSignature(),
    SECRET: process.env.NEXT_PUBLIC_SECRET as string,
    IPADDRESS: ipAddress,
  };

  return headers;
};
