import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Buffer "mo:base/Buffer";

/* 
NFT Details:
-can't be sent more than once
-title, organization, and description are required
-image URL
*/

class Token(id: Nat, creator: Principal, title: Text, organization: Text, description: Text, image: Text) {
  let id: Nat = id;
  let creator: Principal = creator;
  let title: Text = title;
  let organization: Text = organization;
  let description: Text = description;
  let image: Text = image;
  let owners: Trie.Trie<Principal, ()> = Trie.empty();
};

actor {
  private type TokenAddress = Principal;

  private stable var tokenEntries: Buffer.Buffer<Token> = Buffer.Buffer(0);

  public shared(msg) func createToken(title: Text, organization: Text, description: Text, image: Text): async Nat {
    let token = Token(tokenEntries.size(), msg.caller, title, organization, description, image);
    tokenEntries.add(token);
    return token.id;
  };

  public shared(msg) func sendToken(token: Nat, to: Principal): () {
    assert tokenEntries.size() > token;
    assert not tokenEntries.get(token).owners.mem(to);
    assert tokenEntries.get(token).creator == msg.caller;
    tokenEntries.get(token).owners.put(to);
  };

  public shared(msg) func getToken(token: Nat): () {
    assert tokenEntries.size() > token;
    return tokenEntries.get(token);
  };
}