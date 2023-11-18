import axios from 'axios';
import TvTeam from "./tvteam.json";
import { UserException } from "../../user-exception";
import { epgGenerator } from "../epg.generator";

export async function* tvTeamGenerator(token: string): AsyncGenerator<string, void, unknown> {
  if (!token || token === "TOKEN") {
    throw new UserException("Invalid token", 400);
  }

  for (const line of epgGenerator()) {
    yield line;
  }

  const url = `http://troya.one/pl/21/${token}/playlist.m3u8`;

  try {
    const response = await axios.get(url);
    let m3uContent = response.data;

    TvTeam.forEach(channel => {
      const regex = new RegExp(`#EXTINF:-1 tvg-id="${channel.channelId}".*?,\\s*${channel.channelName}`);
      const replacement = `#EXTINF:-1 tvg-id="${channel.channelId}" tvg-name="${channel.tvTeamId}" tvg-shift="${channel.timeShift}",${channel.channelName}`;
      m3uContent = m3uContent.replace(regex, replacement);
    });

    yield m3uContent;
  } catch (error: any) {
    console.error('Error in tvTeamGenerator:', error.message);
    throw error;
  }

  for (const line of epgGenerator()) {
    yield line;
  }
}
