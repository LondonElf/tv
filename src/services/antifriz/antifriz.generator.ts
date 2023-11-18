import AntiFriz from "./antifriz.json";
import AdditionalLinks from "./additional_link.json";
import { UserException } from "../../user-exception";
import { epgGenerator } from "../epg.generator";

const BASE_URL = "http://bethoven.af-stream.com";
const CATCHUP_ENDPOINT = "video-${start}-${duration}.m3u8";

export function* antiFrizGenerator(
  _: string,
  token: string
): Generator<string, void, unknown> {
  if (!token || token === "TOKEN") {
    throw new UserException("Invalid token", 400);
  }

  for (const line of epgGenerator()) {
    yield line;
  }

  for (const {
    tvgId,
    tvgLogo,
    extGrp,
    channelName,
    //channelId,
    tvgRec,
    catchupDays,
  } of AntiFriz) {
    yield "";
    yield `#EXTINF:0 tvg-id="${tvgId}" tvg-logo="${tvgLogo}" catchup-source="${BASE_URL}/${tvgId}/${CATCHUP_ENDPOINT}?token=${token}" tvg-rec="${tvgRec}" catchup-days="${catchupDays}",${channelName}`;
    yield `#EXTGRP:${extGrp}`;
    yield `${BASE_URL}:1600/s/${token}/${tvgId}/video.m3u8`;
  }

  for (const {
    tvgId,
    tvgLogo,
    extGrp,
    channelName,
    url,
  } of AdditionalLinks) {
    yield "";
    yield `#EXTINF:0 tvg-id="${tvgId}" tvg-logo="${tvgLogo}",${channelName}`;
    yield `#EXTGRP:${extGrp}`;
    yield url;
  }
}
