import { EmptyCurrentSetting } from "@/components/_emptyComponents/emptyCurrentSetting";
import { useSettingContext } from "@/contexts/setting.context";

export const SelectedSetting = () => {
  const { currentSetting } = useSettingContext();

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentSetting ? (
        <div className="h-component flex px-8 border-b-2 items-center py-4 justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{currentSetting.name}</h1>

            <span>{currentSetting.description}</span>
          </div>
        </div>
      ) : (
        <EmptyCurrentSetting />
      )}

      {currentSetting && (
        <ul
          className={
            currentSetting
              ? "h-screenMinus176 flex flex-col "
              : "h-screenMinus176 flex flex-col "
          }
        >
          {currentSetting.settings.length > 0 &&
            currentSetting.settings.map((settingOption: any) => {
              return (
                <li
                  className="min-w-full h-component flex justify-between items-center gap-2 px-4 border-b-2 cursor-pointer"
                  key={settingOption.name}
                >
                  {settingOption.name}

                  {settingOption.component && settingOption.component}
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
};
