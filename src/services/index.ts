import { liveGoGenerator } from "./livego/livego.generator";
import { liveGoDmGenerator } from "./livegodm/livegodm.generator";
import { liveGoUsGenerator } from "./livegous/livegous.generator";
import { antiFrizGenerator } from "./antifriz/antifriz.generator";
import { antiFrizDmGenerator } from "./antifrizdm/antifrizdm.generator";
import { edemGenerator } from "./edem/edem.generator";
import { edemDmGenerator } from "./edemdm/edemdm.generator";
import { crystalGenerator } from "./crystal/crystal.generator";
import { crystalDmGenerator } from "./crystaldm/crystaldm.generator";
import { dinoGenerator } from "./dino/dino.generator";
import { dinoDmGenerator } from "./dinodm/dinodm.generator";
import { liveGoTestGenerator } from "./livegotest/livegotest.generator";
import { aflistGenerator } from "./aflist/aflist.generator";
import { tvTeamGenerator } from "./tvteam/tvteam.generator.js";

type M3uGenerator<T extends Generator<string, void, unknown> | AsyncGenerator<string, void, unknown>> = (username: string, password: string) => T;

export const SERVICE_GENERATORS: Record<string, M3uGenerator<any>> = {
    "tvil2": aflistGenerator,
    "livegous": liveGoUsGenerator,
    "livego": liveGoGenerator,
    "livegodm": liveGoDmGenerator,
    "crystal": crystalGenerator,
    "crystaldm": crystalDmGenerator,
    "dino": dinoGenerator,
    "dinodm": dinoDmGenerator,
    "tvil": antiFrizGenerator,
    "antifrizdm": antiFrizDmGenerator,
    "edem": edemGenerator,
    "edemdm": edemDmGenerator,
    "livegotest": liveGoTestGenerator,
    "tvteam": tvTeamGenerator
};
