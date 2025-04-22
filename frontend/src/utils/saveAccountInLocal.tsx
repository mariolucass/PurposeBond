export const saveAccountInLocalStorage = (response: any) => {
  const token = response.accessToken;
  localStorage.setItem("tokenRedeSocial", token);

  const accountsString = localStorage.getItem("accounts");
  const accounts = accountsString ? JSON.parse(accountsString) : [];

  const { username } = response.user;

  const accountInLocalStorage = accounts.find(
    (account: any) => account.username === username
  );

  const now = new Date();
  const expiresInTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const expiresIn = expiresInTime.toISOString().slice(0, 23).replace("T", " ");

  if (accountInLocalStorage) {
    const accountIndex = accounts.indexOf(accountInLocalStorage);
    accounts[accountIndex] = {
      ...accountInLocalStorage,
      token,
      expiresIn,
    };

    localStorage.setItem("accounts", JSON.stringify(accounts));
  } else {
    accounts.push({
      ...response.user,
      token,
      expiresIn,
    });

    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
};
