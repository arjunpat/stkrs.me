import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import TrieSet "mo:base/TrieSet";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Option "mo:base/Option";

import T "types";

actor {
  private var stkrEntries: Buffer.Buffer<T.Stkr> = Buffer.Buffer(0);
  private var userToStkr = HashMap.HashMap<Principal, TrieSet.Set<Nat>>(10, Principal.equal, Principal.hash);
  private var userToData = HashMap.HashMap<Principal, T.UserData>(10, Principal.equal, Principal.hash);

  public shared(msg) func createStkr(title: Text, organization: Text, description: Text, image: Text): async Nat {
    let s: T.Stkr = {
      id = stkrEntries.size();
      creator = msg.caller;
      title;
      organization;
      description;
      image;
    };
    stkrEntries.add(s);
    return s.id;
  };

  public shared(msg) func sendStkr(stkr: Nat, to: Principal): () {
    assert stkrEntries.size() > stkr;
    assert stkrEntries.get(stkr).creator == msg.caller;

    let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(to)) {
      case null {
        TrieSet.empty()
      };
      case (?s) s
    };
    assert not TrieSet.mem(stkrs, stkr, Int.hash(stkr), Nat.equal);
    userToStkr.put(to, TrieSet.put(stkrs, stkr, Int.hash(stkr), Nat.equal));
  };

  public shared(msg) func setUser(user: T.UserData): () {
    userToData.put(msg.caller, user);
  };

  public shared(msg) func getUser(user: ?Principal): async ?T.UserData {
    switch (user) {
      case null userToData.get(msg.caller);
      case (?u) userToData.get(u)
    }
  };

  public shared(msg) func getStkrs(u: ?Principal): async [T.Stkr] {
    let user: Principal = switch (u) {
      case (null) msg.caller;
      case (?u) u
    };

    let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(user)) {
      case null {
        TrieSet.empty()
      };
      case (?s) s
    };
    Array.map(TrieSet.toArray(stkrs), stkrEntries.get)
  };

}