

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

  public type Comment = {
    creator: Principal;
    content: Text;
    createdAt: Int;
  };

  public type UserData = {
    name: Text;
    bio: Text;
    profile_image: Text;
  };
}