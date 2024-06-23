"use client";

import { getUsers } from "@/services/users.services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AccountSelector } from "./accountSelector";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [usersInDatabase, setUsersInDatabase] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: any[] = await getUsers();
        setUsersInDatabase(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    if (!usersInDatabase.length) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    if (usersInDatabase.length > 0) {
      const accountsString = localStorage.getItem("accounts");
      const accounts = accountsString ? JSON.parse(accountsString) : null;

      if (accounts) {
        const accountsExist = accounts.filter((account: any) => {
          return usersInDatabase.some(
            (user) => user.username === account.username
          );
        });

        const dateNow = new Date();

        const verifyIsExpired = (date: string) => {
          const expiresInDate = new Date(date);
          return expiresInDate < dateNow;
        };

        const accountsValidated = accountsExist.map((account: any) => {
          return { ...account, isExpired: verifyIsExpired(account.expiresIn) };
        });

        setAccounts(accountsValidated);
      }
    }
  }, [usersInDatabase]);

  return (
    <section className="w-1/2 h-full flex flex-col gap-4 shadow-sm mx-auto r">
      <div className="w-full border-2 flex flex-col gap-4 p-4 rounded-sm">
        <h1 className="text-2xl text-center">PurposeBond</h1>
        <AccountSelector accounts={accounts} />
      </div>

      <div className="w-full border-2 h-28 p-4 flex justify-center items-center rounded-sm">
        <span className="self-center">
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
};

export default AccountsPage;
