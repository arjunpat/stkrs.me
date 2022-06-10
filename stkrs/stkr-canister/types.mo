

module {
  public type Stkr = {
    id: Nat;
    creator: Principal;
    title: Text;
    organization: Text;
    description: Text;
    category: Text;
    image: Text;
  };

  public type UserData = {
    name: Text;
    bio: Text;
    profile_image: Text;
  };
}