import { Setting } from "../../settings/Settings";
import { UserScript } from "../../UserScript";
import { UiComponent } from "./UiComponent";

export class SettingListItem<TSetting extends Setting = Setting> extends UiComponent {
  readonly setting: TSetting;
  readonly element: JQuery<HTMLElement>;
  readonly checkbox: JQuery<HTMLElement>;

  readOnly: boolean;

  /**
   * Construct a new setting element.
   * This is a simple checkbox with a label.
   *
   * @param host The userscript instance.
   * @param label The label on the setting element.
   * @param setting The setting this element is linked to.
   * @param handler The event handlers for this setting element.
   * @param handler.onCheck Will be invoked when the user checks the checkbox.
   * @param handler.onUnCheck Will be invoked when the user unchecks the checkbox.
   * @param delimiter Should there be additional padding below this element?
   * @param upgradeIndicator Should an indicator be rendered in front of the elemnt,
   * to indicate that this is an upgrade of a prior setting?
   * @param readOnly Should the user be prevented from changing the value of the input?
   */
  constructor(
    host: UserScript,
    label: string,
    setting: TSetting,
    handler: {
      onCheck: () => void;
      onUnCheck: () => void;
    },
    delimiter = false,
    upgradeIndicator = false,
    readOnly = false
  ) {
    super(host);

    const element = $(`<li/>`);
    for (const cssClass of ["ks-setting", delimiter ? "ks-delimiter" : ""]) {
      element.addClass(cssClass);
    }

    const elementLabel = $("<label/>", {
      text: `${upgradeIndicator ? `⮤ ` : ""}${label}`,
    }).addClass("ks-label");

    const checkbox = $("<input/>", {
      type: "checkbox",
    }).addClass("ks-checkbox");

    this.readOnly = readOnly;

    checkbox.on("change", () => {
      if (checkbox.is(":checked") && setting.enabled === false) {
        setting.enabled = true;
        handler.onCheck();
      } else if (!checkbox.is(":checked") && setting.enabled === true) {
        setting.enabled = false;
        handler.onUnCheck();
      }
    });

    elementLabel.prepend(checkbox);
    element.append(elementLabel);

    this.checkbox = checkbox;
    this.element = element;
    this.setting = setting;
  }

  refreshUi() {
    super.refreshUi();

    this.checkbox.prop("checked", this.setting.enabled);
    this.checkbox.prop("disabled", this.readOnly);
  }
}
