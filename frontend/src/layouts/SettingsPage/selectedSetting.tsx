import { AnimatePresence } from "framer-motion";
import { Settings2 } from "lucide-react";
import { Fragment } from "react";
import { ContentTransition } from "../Animations/ContentTransition";

export const SelectedSetting = ({
  currentSetting,
}: {
  currentSetting: any;
}) => {
  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <AnimatePresence mode="wait">
        {currentSetting ? (
          <>
            <div className="min-h-component flex px-4 border-b-2 items-center py-4 justify-between">
              <div className="ml-4 flex flex-col">
                <h1 className="text-base font-bold">{currentSetting.name}</h1>
                <span className="text-sm">{currentSetting.description}</span>
              </div>
            </div>

            <ContentTransition key={currentSetting.name}>
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
            </ContentTransition>
          </>
        ) : (
          <EmptyCurrentSetting />
        )}
      </AnimatePresence>
    </section>
  );
};

const EmptyCurrentSetting = () => (
  <Fragment key="empty">
    <div className="h-component flex px-4 border-b-2 items-center py-6 justify-between">
      <div className="flex flex-col ml-4">
        <h3 className="text-base font-bold">Setting</h3>

        <span className="text-sm">Select a setting to change.</span>
      </div>
    </div>

    <ContentTransition>
      <div className="flex flex-col items-center justify-start pt-8 h-full text-center px-4 gap-4">
        <div className="bg-muted p-4 rounded-full">
          <Settings2 className="w-8 h-8 text-muted-foreground" />
        </div>

        <h2 className="text-base font-semibold text-foreground">Settings</h2>
        <p className="text-sm max-w-sm text-muted-foreground ">
          Select a setting on the left to view and customize your experience.
        </p>
      </div>
    </ContentTransition>
  </Fragment>
);
