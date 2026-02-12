import type { Bot } from "grammy";
import { register as registerDb } from "./db";
import { register as registerEcho } from "./echo";
import { register as registerGeneral } from "./general";
import { register as registerHelp } from "./help";

export function registerControllers(bot: Bot) {
  registerGeneral(bot);
  registerHelp(bot);
  registerDb(bot);
  registerEcho(bot);
}
