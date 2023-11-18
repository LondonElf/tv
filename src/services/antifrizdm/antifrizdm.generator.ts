import AntiFrizDm from "./antifrizdm.json";
import { UserException } from "../../user-exception";
import { epgGenerator } from "../epg.generator";

const BASE_URL = "troya.today";


export function* antiFrizDmGenerator(
  username: string,
  password: string
): Generator<string, void, unknown> {
  if (!username || !password || username == "USERNAME" || password == "PASSWORD") {
    throw new UserException("Invalid username or password", 400);
  }


  for (const line of epgGenerator()) {
    yield line;
  }

  for (const {
    tvgId,
    tvgLogo,
    extGrp,
    channelName,
    channelId,
    tvgRec,
   // catchupDays,
  } of AntiFrizDm) {
    yield "";
    yield `#EXTINF:0 tvg-id="${tvgId}" tvg-logo="${tvgLogo}"  timeshift="${tvgRec}",${channelName}`;
    yield `#EXTGRP:${extGrp}`;
    yield `http://${username}.${BASE_URL}:34000/${channelId}/mono.m3u8?token=${password}`;
  }
}



