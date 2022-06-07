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
  let id = id;
  let creator = creator;
  let title = title;
  let organization = organization;
  let description = description;
  let image = image;
  let owners : Trie.Trie<Principal, ()> = Trie.empty<Principal>();
}

actor {
  private type TokenAddress = Principal;

  private stable var tokenEntries : Buffer<Token> = Buffer(0);

  public shared(msg) func createToken(title: Text, organization: Text, description: Text, image: Text) {
    let token = Token(tokenEntries.length, msg.caller, title, organization, description, image);
    tokenEntries.add(token);
    return token;
  }

  public shared(msg) func sendToken(token: Nat, to: Principal) {
    assert tokenEntries.size() > token;
    assert !tokenEntries.get(token).owners.mem(to);
    assert tokenEntries.get(token).creator == msg.caller;
    tokenEntries.get(token).owners.put(to);
  }

  public shared(msg) func getToken(token: Nat) {
    assert tokenEntries.size() > token;
    return tokenEntries.get(token);
  }
}