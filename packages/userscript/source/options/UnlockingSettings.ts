import { SettingsSection } from "./SettingsSection";

export type UnlockItem = "buildings" | "missions" | "policies" | "races" | "techs" | "upgrades";
export type UnlockingSettingsItem = { enabled: boolean; $enabled?: JQuery<HTMLElement> };
export class UnlockingSettings extends SettingsSection {
  items: {
    [key in UnlockItem]: UnlockingSettingsItem;
  } = {
    upgrades: { enabled: true },
    techs: { enabled: true },
    policies: { enabled: true },
    races: { enabled: true },
    missions: { enabled: true },
    buildings: { enabled: true },
  };
}
