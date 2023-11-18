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

type GeneratorFunction = (username: string, password: string) => Generator<string, void, unknown>;
type AsyncGeneratorFunction = (username: string, password: string) => AsyncGenerator<string, void, unknown>;

type M3uGenerator = GeneratorFunction | AsyncGeneratorFunction;

export const SERVICE_GENERATORS: Record<string, M3uGenerator> = {
    "tvil2": aflistGenerator as M3uGenerator,
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
