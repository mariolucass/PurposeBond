export const SideBarLeft = () => {
  return (
    <section className="w-2/6 min-h-full flex flex-col justify-start items-center">
      <div></div>
      <ul className="flex flex-col">
        <li>Homepage</li>
        <li>Profile</li>
        <li>Followers</li>
        <li>About</li>
      </ul>
    </section>
  );
};

export const SideBarRight = () => {
  return (
    <section className="w-2/6 min-h-full flex flex-col justify-start items-center">
      <ul>
        <li>Usuário1</li>
        <li>Usuário1</li>
        <li>Usuário2</li>
        <li>Usuário3</li>
      </ul>
    </section>
  );
};
