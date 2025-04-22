import { DeleteAccount } from "@/components/settings/deleteAccount";
import { FontSelector } from "@/components/settings/fontSelector";
import { LanguageSelector } from "@/components/settings/languageSelector";
import { ThemeSelector } from "@/components/settings/themeSelector";
import { Switch } from "@/components/ui/switch";

export interface Setting {
  name: string;
  description: string;
  settings: any[];
}

export const settingsList: Setting[] = [
  {
    name: "Your Account",
    description: "Manage your personal information and preferences options.",
    settings: [
      {
        name: "Email Notifications",
        setting: "emailNotifications",
        component: <Switch />,
      },
      {
        name: "Private Profile",
        setting: "privateProfile",
        component: <Switch />,
      },
      {
        name: "Language",
        setting: "language",
        component: <LanguageSelector />,
      },
      {
        name: "Delete Account",
        setting: "delete",
        component: <DeleteAccount />,
      },
    ],
  },
  {
    name: "Personalization",
    description: "Tailor your website experience to match your unique taste.",
    settings: [
      {
        name: "Theme",
        setting: "theme",
        component: <ThemeSelector />,
      },
      {
        name: "Font",
        setting: "font",
        component: <FontSelector />,
      },
      {
        name: "Font Size",
        setting: "fontSize",
        component: <FontSelector />,
      },
    ],
  },
  {
    name: "Security",
    description: "Enhance your account protection and manage secure access.",
    settings: [
      {
        name: "Two-Factor Authentication",
        setting: "2fa",
        component: <Switch />,
      },
      {
        name: "Biometric Login",
        setting: "biometric",
        component: <Switch />,
      },
      {
        name: "Active Sessions",
        setting: "sessions",
        component: <Switch />,
      },
    ],
  },
  {
    name: "Notifications",
    description: "Control how and when we notify you.",
    settings: [
      {
        name: "Push Notifications",
        setting: "pushNotifications",
        component: <Switch />,
      },
      {
        name: "In-App Sounds",
        setting: "sounds",
        component: <Switch />,
      },
      {
        name: "Weekly Summary Emails",
        setting: "summaryEmails",
        component: <Switch />,
      },
    ],
  },
  {
    name: "Data & Privacy",
    description: "Control your data and understand how it's used.",
    settings: [
      {
        name: "Download My Data",
        setting: "downloadData",
        component: <Switch />,
      },
      {
        name: "Ad Preferences",
        setting: "adPreferences",
        component: <Switch />,
      },
      {
        name: "Clear Search History",
        setting: "clearHistory",
        component: <Switch />,
      },
    ],
  },
];
