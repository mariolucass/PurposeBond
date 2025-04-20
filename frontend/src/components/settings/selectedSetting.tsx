import { EmptyCurrentSetting } from "@/components/_emptyComponents/emptyCurrentSetting";
import { useSettingContext } from "@/contexts/domains/AuthDomain/setting.context";
import { Settings2 } from "lucide-react";

export const SelectedSetting = () => {
  const { currentSetting } = useSettingContext();

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentSetting ? (
        <>
          <div className="h-component flex px-4 border-b-2 items-center py-4 justify-between">
            <div className="ml-4 flex flex-col">
              <h1 className="text-base font-bold">{currentSetting.name}</h1>
              <span className="text-sm">{currentSetting.description}</span>
            </div>
          </div>

          <ul className="h-screenMinus176 flex flex-col gap-1 mt-4">
            {currentSetting.settings.length > 0 &&
              currentSetting.settings.map((settingOption: any) => {
                return (
                  <li
                    className="min-w-full text-sm flex justify-between items-center gap-2 py-3 px-4 border-b-2 cursor-pointer"
                    key={settingOption.name}
                  >
                    {settingOption.name}

                    {settingOption.component && settingOption.component}
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <>
          <EmptyCurrentSetting />
          <SettingPlaceholder />
        </>
      )}
    </section>
  );
};

const SettingPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
      <div className="bg-muted p-4 rounded-full">
        <Settings2 className="w-8 h-8 text-muted-foreground" />
      </div>

      <h2 className="text-base font-semibold text-foreground">Settings</h2>
      <p className="text-sm max-w-sm text-muted-foreground ">
        Select a setting on the left to view and customize your experience.
      </p>
    </div>
  );
};
