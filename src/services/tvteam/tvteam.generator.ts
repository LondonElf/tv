import axios from 'axios';
import TvTeam from "./tvteam.json";
import { UserException } from "../../user-exception";
import { epgGenerator } from "../epg.generator";

export async function* tvTeamGenerator(
  _: string,
  token: string
): AsyncGenerator<string, void, unknown> {
  if (!token || token === "TOKEN") {
    throw new UserException("Invalid token", 400);
  }

  // Replace 'YOUR_TOKEN' with the actual token retrieved from the request handling in index.ts
  const url = `http://troya.one/pl/21/${token}/playlist.m3u8`;

  try {
    // Make a request to the provided URL
    const response = await axios.get(url);

    // Assuming the response.data contains the M3U file content
    let m3uContent = response.data;

    // Replace channel information in the M3U file content
    TvTeam.forEach(channel => {
      const regex = new RegExp(`#EXTINF:-1 tvg-id="${channel.channelId}".*?,\\s*${channel.channelName}`);
      const replacement = `#EXTINF:-1 tvg-id="${channel.channelId}" tvg-name="${channel.tvTeamId}" tvg-shift="${channel.timeShift}",${channel.channelName}`;
      m3uContent = m3uContent.replace(regex, replacement);
    });

    // You can perform additional modifications if needed

    // Yield the modified M3U file content
    yield m3uContent;
  } catch (error: any) {
    // Handle errors, e.g., log them
    console.error('Error in tvTeamGenerator:', error.message);

    // Throw an error or return a default content if needed
    throw error;
  }

  // Yield EPG lines
  for (const line of epgGenerator()) {
    yield line;
  }
}
